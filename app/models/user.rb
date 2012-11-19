class User < ActiveRecord::Base
  attr_accessible :email, :first_name, :last_name, :admin, :password, :password_confirmation
  attr_accessible :fb_user_id, :fb_status, :fb_access_token, :fb_signed_request, :fb_expires
  has_secure_password
  
  
  before_save { |user| user.email = email.downcase }
  before_save :create_remember_token
  
  validates :first_name, presence: true, length: { maximum: 50 }
  validates :last_name, presence: true, length: { maximum: 50 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

# removed so we can update via without pw fields
# TODO - keep pw validation for secure stuff, move nonsecure to profile table
#  validates :password,  length: { minimum: 6 }
#  validates :password_confirmation, presence: true
  
 
  
  private

    def create_remember_token
      self.remember_token = SecureRandom.urlsafe_base64
    end
  
end
