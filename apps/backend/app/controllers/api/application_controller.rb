module Api
  class ApplicationController < ActionController::API
    def authenticate_user!
      token = request.headers["Authorization"]&.delete_prefix("Bearer ")
      @current_user = User.find_by(auth_token: token)
      render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
    end
  end
end
