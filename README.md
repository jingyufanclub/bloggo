bloggo

ruby -rubygems -e 'require "jekyll-import";
    JekyllImport::Importers::Tumblr.run({
      "url"            => "http://duncecapsforcats.com",
      "format"         => "html",
      "grab_images"    => true,
      "add_highlights" => true,
      "rewrite_urls"   => true
    })'
