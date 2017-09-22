# Default Sinatra to "production" mode (surpress errors) unless
# otherwise specified by the `RACK_ENV` environmental variable.
# Must be done prior to requiring Sinatra, or we'll get a LoadError
# as it looks for sinatra/cross-origin, which is development only
ENV["RACK_ENV"] = "production" if ENV["RACK_ENV"].to_s.empty?

require "oj" # Optimized JSON. https://github.com/ohler55/oj
require "jekyll"
require "base64"
require "webrick"
require "sinatra"
require "fileutils"
require "sinatra/base"
require "sinatra/json"
require "addressable/uri"
require "sinatra/reloader"
require "sinatra/namespace"



class Authenticator
  def initialize(app)
    @app = app
    config_file = File.join(__dir__, "..", "config.json")
    file = File.read(config_file)
    @data = JSON.parse(file)
  end

  def call(env)
    environment = Rack::Request.new(env)

    requestAuth = env["HTTP_X_USER_AUTH"]
    result = false
    @data["users"].each do |auth|
      baseEncoded = Digest::SHA1.hexdigest(auth["username"]+":"+auth["password_sha1"])
      currentResult = (baseEncoded == requestAuth)
      result = currentResult
      break if currentResult
    end

    # puts env.inspect

    if result or env["REQUEST_METHOD"] == "OPTIONS"
      @app.call(env)
    else
      Rack::Response.new([], 401, {}).finish
    end

    # if Rack::Request.new(env).params['X-Authorization'] == 'MY_SECRET_TOKEN'
    # else
    #   Rack::Response.new([], 401, {}).finish
    # end
  end
end

module JekyllManager
  autoload :VERSION, "jekyll-manager/version"
end

module JekyllAdmin
  autoload :APIable,          "jekyll-admin/apiable"
  autoload :DataFile,         "jekyll-admin/data_file"
  autoload :Directory,        "jekyll-admin/directory"
  autoload :FileHelper,       "jekyll-admin/file_helper"
  autoload :PageWithoutAFile, "jekyll-admin/page_without_a_file"
  autoload :PathHelper,       "jekyll-admin/path_helper"
  autoload :Server,           "jekyll-admin/server"
  autoload :StaticServer,     "jekyll-admin/static_server"
  autoload :URLable,          "jekyll-admin/urlable"

  def self.site
    @site ||= begin
      site = Jekyll.sites.first
      site.future = true
      site
    end
  end
end

# Monkey Patches
require_relative "./jekyll/commands/serve"
require_relative "./jekyll/commands/build"

[Jekyll::Page, Jekyll::Document, Jekyll::StaticFile, Jekyll::Collection].each do |klass|
  klass.include JekyllAdmin::APIable
  klass.include JekyllAdmin::URLable
end
