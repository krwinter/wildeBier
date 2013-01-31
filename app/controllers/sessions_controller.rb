class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by_email(params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      
      sign_in user
      
      respond_to do |format|
        format.html { redirect_back_or root_path }
        format.json { render json:  { :id => user.id, 
                                    :first_name => user.first_name, 
                                    :last_name => user.last_name,
                                    :email=> user.email,
                                    :remember_token=> user.remember_token
                                  }
                     }
      end
      
      
    else
      
      respond_to do |format|
        format.html { #render'new' }
           flash.now[:error] = 'Invalid email/password combination'
           render 'new'
        }
        
        
        format.json { render :json => { :error => 'Invalid email/password combination' }, :status => 422 }

      end
        
    end
  end

  def destroy
    sign_out
    redirect_to root_url
  end

end
