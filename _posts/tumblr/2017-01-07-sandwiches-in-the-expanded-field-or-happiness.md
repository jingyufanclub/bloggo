---
layout: post
title: Sandwiches in the Expanded Field, or, “Happiness is...sharing a sandwich.”
date: '2017-01-07T23:32:53-05:00'
tags: []
tumblr_url: http://duncecapsforcats.com/post/155559529557/sandwiches-in-the-expanded-field-or-happiness
---
Sando Club is about friendship. Members eat sandwiches and collect stamps together in exchange for fun and prizes. Sandwich Club is about documentation. Members record their best sandwich meals and comments in a Google Sheet. [Sando Club](http://sandoclub.tumblr.com) is ephemeral; [Sandwich Club](http://sandwich-club.org/) is a database.

![sando spreadsheet](http://68.media.tumblr.com/c957ed22b280059ec56662440bd923ca/tumblr_inline_ojfv9zElQP1qag9g1_1280.png)

You can access [Sandwich Club’s Goggle Sheet](https://docs.google.com/spreadsheets/d/1TsvTu_lRNoZ3KCCKp5bc0PejxO27zjj8PzoZa-UfUe0/edit#gid=1) via a link on their website. Anyone with the link can record sandwiches and comments. I saved this sheet as a comma-separated values (CSV) file and used Ruby’s CSV class methods to parse the file and seed the database for a Rails application. I wanted to preserve both the functions of the sheet and its ethos, i.e. anyone can access the database and add valid entries by code of honor, no user sign-up or login required.

![sando app](http://68.media.tumblr.com/6bf3010ebb39fe5409864152ca583fe7/tumblr_ojiyg39SiT1vmucwyo1_1280.png)

In the app you can view a list of all the sandwiches, see individual sandwich entries, view each member and a list of all the sandwiches she has eaten, add a new sandwich, and leave comments for each sandwich.

![sando app](http://68.media.tumblr.com/1cdd27e16e7ae6ba028ab9d2aaf8e6dd/tumblr_inline_ojfwdi2cOW1qag9g1_1280.png)

A particular challenge of adding a new sandwich is the ability to create a new eater and assign her to that sandwich. To do this I employed nested attributes.

```ruby
class Sandwich < ApplicationRecord
  has_many :eater_sandwiches
  has_many :eaters, through: :eater_sandwiches
  has_many :comments
  validates :ingredients, :eaters, :tasting_notes, :date, presence: true
  accepts_nested_attributes_for :eaters
  accepts_nested_attributes_for :comments, reject_if: :blank_comment?

  private

  def blank_comment?(attributes)
    attributes[:text].blank? || attributes[:eater_id].blank?
  end
end
```

According to [Rails documentation](http://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html):

“Nested attributes allow you to save attributes on associated records through the parent. By default nested attribute updating is turned off and you can enable it using the <i>#accepts_nested_attributes_for</i> class method. When you enable nested attributes an attribute writer is defined on the model. The attribute writer is named after the association.”

In my example this means that a new method has been added to the model:

```ruby
eater_attributes=(attributes)
```

And in the sandwiches controller I must whitelist the new associated params:

```ruby
def sandwich_params
  params.require(:sandwich).permit(:ingredients, :date, :location, :price, :tasting_notes, eater_ids: [], eater_attributes: [:id, :name], comment_attributes: [:text, :sandwich_id, :eater_id])
end
```

My new sandwich form looks like this:

```ruby
form_for @sandwich do |f|
  f.label :eater_ids, "Whom ate this?"
  f.select(:eater_ids, @eaters.map {|e| [e.name, e.id] }, {prompt: "Select one or many"}, {multiple: true, size: 8})

    f.fields_for :eater do |ff|
      ff.label :name, "Add an eater not on this list"
      ff.text_field :name
      ff.hidden_field :id
    end

  f.submit "Add Sandwich"
end
```

And for the sandwich controller&rsquo;s create action:

```ruby
@eater = Eater.find_or_create_by(name: params[:sandwich][:eater][:name])
```

In these snippets you can see that I also have nested attributes for comments. On an individual sandwich page you can create a new comment to associate with that sandwich and at the same time create a new user for that comment.

![sando app](http://68.media.tumblr.com/d4df26b7c674a25f389e61b273a95f98/tumblr_inline_ojfyi9kQkS1qag9g1_1280.png)

The form for updating a sandwich will have a nested field for adding a new comment which in turn has a nested field for adding an eater.

```ruby
form_for @sandwich do |f|
  f.fields_for :comment do |ff|
    ff.text_area :text, size: "150x2"
    ff.fields_for :eater do |fff|
      fff.label :name, "Your Name"
      fff.text_field :name
      fff.hidden_field :id
    end
  end
  f.submit "Add Comment"
end
```

I added to the comment model:

```ruby
accepts_nested_attributes_for :eater
```

and whitelisted the attributes in the comment controller:

```ruby
def comment_params
  params.require(:comment).permit(:text, :sandwich_id, :eater_id, eater_attributes: [:id, :name])
end
```

And in the sandwich controller&rsquo;s update action I shall need:

```ruby
@comment = Comment.new(text: params[:sandwich][:comment][:text], sandwich_id: @sandwich.id)

@eater = Eater.find_or_create_by(name: params[:sandwich][:comment][:eater][:name])
```

Nested attributes are not so terrible and you many never have to use them!
The Sixth Annual [Sandwich Club Summit](http://sandwich-club.org/events/) will take place in September in Wassaic, NY.
