module Api
  class SessionsController < ApplicationController
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        token = user.generate_token!
        render json: { token: token, profile: user.serialize }
      else
        render json: { error: "Invalid username or password" }, status: :unauthorized
      end
    end

    def destroy
      token = request.headers["Authorization"]&.delete_prefix("Bearer ")
      User.find_by(auth_token: token)&.clear_token!
      head :no_content
    end

    def me
      token = request.headers["Authorization"]&.delete_prefix("Bearer ")
      user = User.find_by(auth_token: token)
      if user
        render json: user.serialize
      else
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end
