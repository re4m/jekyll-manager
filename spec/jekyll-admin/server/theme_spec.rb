describe "theme" do
  include Rack::Test::Methods

  def app
    JekyllAdmin::Server
  end

  before(:each) do
    JekyllAdmin.site.process
  end

  after(:each) do
    JekyllAdmin.site.process
  end

  context "index" do
    let(:theme) { last_response_parsed }
    let(:directories) do
      theme["directories"]
    end
    let(:sample_directory) { directories[2] }

    it "lists theme metadata" do
      get "/theme"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("test-theme")
      expect(last_response_parsed["version"]).to eq("0.1.0")
      expect(last_response_parsed["authors"]).to eq("Jekyll")
      expect(last_response_parsed["license"]).to eq("MIT")
    end

    it "lists theme directories" do
      theme_dirs = %w(assets _includes _layouts _sass)
      get "/theme"
      expect(last_response).to be_ok
      expect(directories.map { |d| d["name"] }).to eq(theme_dirs)
    end

    it "doesn't include the directory contents" do
      get "/theme"
      expect(last_response).to be_ok
      expect(sample_directory).to_not have_key("content")
      expect(sample_directory).to_not have_key("raw_content")
    end
  end

  context "getting a single theme directory" do
    it "returns the requested directory" do
      expected = {
        "path"     => "default.html",
        "api_url"  => "http://example.org/_api/theme/_layouts/default.html",
        "http_url" => nil,
      }
      get "/theme/_layouts"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("_layouts")
      expect(last_response_parsed["entries"].first).to eq(expected)
    end

    it "returns subdirectories" do
      expected = {
        "path"     => "icon-dark.png",
        "http_url" => "http://example.org/assets/images/icon-dark.png",
        "api_url"  => "http://example.org/_api/theme/assets/images/icon-dark.png",
      }
      get "/theme/assets/images"
      expect(last_response).to be_ok
      expect(last_response_parsed["entries"].first).to eq(expected)
    end
  end

  context "getting a theme file" do
    it "returns the raw content" do
      expected = "<!DOCTYPE html>\n<html>\n  <head>\n"
      get "/theme/_layouts/default.html"
      expect(last_response).to be_ok
      expect(last_response_parsed["name"]).to eq("default.html")
      expect(last_response_parsed["raw_content"]).to include(expected)
    end

    it "404s for an unknown page" do
      get "/theme/_layouts/foo.html"
      expect(last_response.status).to eql(404)
    end
  end

  it "writes a new page without front matter" do
    delete_file "page-new.md"

    request = {
      :front_matter => {},
      :raw_content  => "test",
      :path         => "page-new.md",
    }
    put "/pages/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect("page-new.md").to be_an_existing_file

    delete_file "page-new.md"
  end

  it "writes a new page with front matter" do
    delete_file "page-new.md"

    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-new.md",
    }
    put "/pages/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-new.md").to be_an_existing_file

    delete_file "page-new.md"
  end

  it "writes a new page in subdirectories" do
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-dir/page-new.md",
    }
    put "/pages/page-dir/page-new.md", request.to_json

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-dir/page-new.md").to be_an_existing_file

    delete_file "page-dir/page-new.md"
  end

  it "does not writes a non html page" do
    expected_error = "Invalid file extension for pages"
    request = {
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
      :path         => "page-new.txt",
    }
    put "/pages/page-new.txt", request.to_json

    expect(last_response).to be_unprocessable
    expect(last_response_parsed["error_message"]).to eq(expected_error)
    expect("page-new.md").to_not be_an_existing_file
  end

  it "updates a page" do
    write_file "page-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "page-update.md",
    }
    put "/pages/page-update.md", request.to_json
    expect("page-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "page-update.md"
  end

  it "updates a page in subdirectories" do
    write_file "page-dir/page-update.md"

    request = {
      :front_matter => { :foo => "bar2" },
      :raw_content  => "test",
      :path         => "page-dir/page-update.md",
    }
    put "/pages/page-dir/page-update.md", request.to_json
    expect("page-dir/page-update.md").to be_an_existing_file

    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar2")

    delete_file "page-dir/page-update.md"
  end

  it "renames a page" do
    write_file  "page-rename.md"
    delete_file "page-renamed.md"

    request = {
      :path         => "page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-rename.md").to_not be_an_existing_file
    expect("page-renamed.md").to be_an_existing_file

    get "/pages/page-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "page-rename.md", "page-renamed.md"
  end

  it "renames a page in subdirectories" do
    write_file  "page-dir/page-rename.md"
    delete_file "page-dir/page-renamed.md"

    request = {
      :path         => "page-dir/page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-dir/page-rename.md", request.to_json
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")
    expect("page-dir/page-rename.md").to_not be_an_existing_file
    expect("page-dir/page-renamed.md").to be_an_existing_file

    get "/pages/page-dir/page-renamed.md"
    expect(last_response).to be_ok
    expect(last_response_parsed["foo"]).to eq("bar")

    delete_file "page-dir/page-rename.md", "page-dir/page-renamed.md"
  end

  it "404s when trying to rename a non-existent page" do
    request = {
      :path         => "page-dir/page-renamed.md",
      :front_matter => { :foo => "bar" },
      :raw_content  => "test",
    }

    put "/pages/page-dir/invalid-page.md", request.to_json
    expect(last_response.status).to eql(404)
    expect("page-dir/page-renamed.md").to_not be_an_existing_file
  end

  it "deletes a page" do
    path = write_file "page-delete.md"
    delete "/pages/page-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end

  it "deletes a page in subdirectories" do
    path = write_file "page-dir/page-delete.md"
    delete "/pages/page-dir/page-delete.md"
    expect(last_response).to be_ok
    expect(File.exist?(path)).to eql(false)
  end
end
