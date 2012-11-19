class AddFbToUsers < ActiveRecord::Migration
  def change
    add_column :users, :fb_user_id, :string
    add_column :users, :fb_status, :string
    add_column :users, :fb_access_token, :string
    add_column :users, :fb_signed_request, :string
    add_column :users, :fb_expires, :string
  end
end
