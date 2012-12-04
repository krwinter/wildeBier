class UsersController < ApplicationController
  
    
  before_filter :signed_in_user,  only: [:home]
  #TODO find way to update user without them being logged in - so we can update fb status, then log them in
  # =>    but restrict profile updates to only logged in users
  before_filter :correct_user,   only: [:edit, :show]
 
  def index
    
    if params[:fbid]
      fbid = params[:fbid]
      # TODO if we find more than one, do something about dupes
      @users = User.find(:first, :conditions => ['fb_user_id = ?', fbid] )
      render json: @users
    else
      @users = User.paginate(page: params[:page])
    end
    
  end
  
  def show
    if params[:id]
      @user = User.find(params[:id])
    end
      
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
    
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
    
    # TODO - fix so we only sign in:
    #         a) existing user in db whose fb credentials we just got, or
    #         b) current user who is updating their profile
    if !signed_in?
      sign_in @user
    end
    
    if @user.update_attributes(params[:user])
      flash[:success] = "Profile updated"
      
      logger.debug ' ############### current_user?=' + current_user?(@user).to_s
      if current_user?(@user)
        sign_in @user
      end
      
      # TODO - make so we redirect from edit page, we do not from in-page ajax request - e.g. to get fb details
      
      if request.xhr?
        logger.debug '++ is request.xhr'
        render :json => {
          #:location => url_for(:controller => 'jobs', :action => 'index'),
          :flash => {:notice => "Hello"}
        }
      else
        redirect_to @user
      end
      
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
