require 'spec_helper'

describe "beers/show" do
  before(:each) do
    @beer = assign(:beer, stub_model(Beer,
      :name => "Name",
      :style => "Style",
      :description => "Description"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/Style/)
    rendered.should match(/Description/)
  end
end
