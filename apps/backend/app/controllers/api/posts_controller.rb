module Api
  class PostsController < ApplicationController
    before_action :authenticate_user!, only: [:create]

    def index
      posts = Post.order(created_at: :desc)
      render json: posts.map { |p| serialize(p) }
    end

    def create
      post = Post.new(
        username: @current_user.username,
        display_name: @current_user.display_name,
        completion: params.require(:post)[:completion]
      )
      if post.save
        render json: serialize(post), status: :created
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def serialize(post)
      {
        id: post.id.to_s,
        username: post.username,
        displayName: post.display_name,
        completion: post.completion,
        timestamp: post.created_at.to_i * 1000
      }
    end
  end
end
