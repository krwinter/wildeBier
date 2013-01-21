class StaticPagesController < ApplicationController
  
  before_filter :signed_in_user,  only: [:home]
  before_filter :admin_user, only: [:admin]

  
  def home
  end

  def help
  end
  
  def admin
  end
end
