require 'spec_helper'

describe "beers/new" do
  before(:each) do
    assign(:beer, stub_model(Beer,
      :name => "MyString",
      :style => "MyString",
      :description => "MyString"
    ).as_new_record)
  end

  it "renders new beer form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => beers_path, :method => "post" do
      assert_select "input#beer_name", :name => "beer[name]"
      assert_select "input#beer_style", :name => "beer[style]"
      assert_select "input#beer_description", :name => "beer[description]"
    end
  end
end
