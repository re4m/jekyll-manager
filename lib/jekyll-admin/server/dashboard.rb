module JekyllAdmin
  class Server < Sinatra::Base
    namespace "/dashboard" do
      get do
        json app_meta.merge!({
          "site" => dashboard_site_payload,
        })
      end

      private

      def app_meta
        {
          "jekyll" => {
            "version"     => Jekyll::VERSION,
            "environment" => Jekyll.env,
          },
          "admin"  => {
            "version"     => VERSION,
            "environment" => ENV["RACK_ENV"],
          },
        }
      end

      def dashboard_site_payload
        {
          "content_pages"   => to_html_pages,
          "data_files"      => DataFile.all.map(&:relative_path),
          "static_files"    => site.static_files.map(&:relative_path),
          "collections"     => site.collection_names,
          "drafts"          => paths_to_drafts,
          "collection_docs" => collection_documents.flatten,
        }.merge! site_docs
      end

      def to_html_pages
        site.pages.select(&:html?).map!(&:path)
      end

      def collection_documents
        cols = site.collections.clone
        cols.delete("posts")
        cols.map { |c| c[1].filtered_entries }
      end

      def site_docs
        site.collections.map { |c| [c[0], c[1].filtered_entries] }.to_h
      end

      def paths_to_drafts
        site.posts.docs.select { |post| post.output_ext == ".html" && post.draft? }
          .map! { |post| post.relative_path.sub("_drafts/", "") }
      end
    end
  end
end
