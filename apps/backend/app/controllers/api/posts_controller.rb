module Api
  class PostsController < ApplicationController
    def index
      posts = Post.order(created_at: :desc)
      render json: posts.map { |p| serialize(p) }
    end

    def create
      post = Post.new(post_params)
      if post.save
        render json: serialize(post), status: :created
      else
        render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def post_params
      params.require(:post).permit(:username, :display_name, :completion)
    end

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
