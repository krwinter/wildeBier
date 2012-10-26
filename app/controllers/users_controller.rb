class UsersController < ApplicationController
  
    
  before_filter :signed_in_user,  only: [:home]
  before_filter :correct_user,   only: [:edit, :update, :show]
 
  def index
    @users = User.paginate(page: params[:page])
  end
  
  def show
    @user = User.find(params[:id])
  end
  
  def edit
    @user = User.find(params[:id])
  end
  
  def new
    @user = User.new
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to WILDEBIER"
      redirect_to @user
    else
      render 'new'
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:success] = "Profile updated"
      
      logger.debug ' ############### current_user?=' + current_user?(@user).to_s
      if current_user?(@user)
        sign_in @user
      end
      
      redirect_to @user
    else
      render 'edit'
    end
    
  end
  
  private
  
      def correct_user
        @user = User.find(params[:id])
        logger.debug "#############################  in correct_user";
        logger.debug 'current_user?=' + current_user?(@user).to_s
        logger.debug 'current_user.admin?=' + current_user.admin?.to_s
        
        if !current_user?(@user) && !current_user.admin?
          redirect_to(root_path)
        end
        
        #redirect_to(root_path) unless current_user?(@user) || @user.admin?
      end
  

end
