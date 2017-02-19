module JekyllAdmin
  class Generator < Jekyll::Generator
    safe true
    priority :lowest

    # Main plugin action, called by Jekyll-core
    def generate(site)
      @site = site
      @site.pages << content_for_file(".admin", admin_source_path)
      collect_static_files
    end

    private

    def collect_static_files
      src = File.expand_path("./public", File.dirname(__FILE__))
      glob = Dir.glob("#{src}/*").reject { |f| File.basename(f) == "index.html" }
      glob.each do |file|
        static_file = Jekyll::StaticFile.new(@site, src, "", File.basename(file), Jekyll::Collection.new(@site, "admin"))
        @site.static_files << static_file
      end
    end

    # Path to /admin/index.html template file
    def admin_source_path
      File.expand_path "./public/index.html", File.dirname(__FILE__)
    end

    # Generates contents for a file
    def content_for_file(filename, file_source_path)
      file = PageWithoutAFile.new(@site, File.dirname(__FILE__), "", filename)
      file.content = File.read(file_source_path)
      file.data["layout"] = nil
      file.data["permalink"] = "/admin/index.html"
      file.output
      file
    end
  end

  class PageWithoutAFile < Jekyll::Page
    def read_yaml(*)
      @data ||= {}
    end
  end

  class StaticWithoutFile < Jekyll::StaticFile
    def read_yaml(*)
      @data ||= {}
    end
  end
end
