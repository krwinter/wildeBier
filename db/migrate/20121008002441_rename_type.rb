class RenameType < ActiveRecord::Migration
  def up
    rename_column :Beers, :type, :style
  end

  def down
  end
end
