module Api
  class ProfilesController < ApplicationController
    before_action :authenticate_user!, only: [:update]

    def index
      render json: User.all.map(&:serialize)
    end

    def show
      user = User.find_by(username: params[:username])
      user ? render(json: user.serialize) : render(json: { error: "Not found" }, status: :not_found)
    end

    def update
      if @current_user.username != params[:username]
        return render json: { error: "Forbidden" }, status: :forbidden
      end

      if @current_user.update(profile_params)
        render json: @current_user.serialize
      else
        render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def profile_params
      permitted = params.require(:profile).permit(:display_name, :bio, top_friends: [])
      if params.dig(:profile, :custom_style).present?
        permitted[:custom_style] = params[:profile][:custom_style]
          .permit(:backgroundColor, :textColor, :accentColor, :fontFamily, :headerBg)
          .to_h
      end
      permitted
    end
  end
end
