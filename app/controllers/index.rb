['/', '/survey/new', '/survey/create'].each do |route|
  before route do
    @user = User.find(session[:id])
  end
end

get '/' do
  if session[:id]
   # user = User.find(session[:id])
    redirect "/user/#{@user.id}"
  else
    erb :index
  end
end

get '/user/:id' do
  @all_surveys = Survey.all
  erb :profile
end

# get '/survey/new' do
#   @user = User.find(session[:id])
# end

post '/survey/create' do
 # @user = User.find(session[:id])
  survey = @user.surveys.create(title: params[:title])
  redirect "/surveys/#{survey.id}"
end

get '/surveys/:id' do
  @survey = Survey.find(params[:id])
  @questions = Question.where(id: @survey.id)
  erb :"survey/create"
end

post '/surveys/:id/question/create' do
  puts "PARAMS id"
  puts params[:description]
  @survey = Survey.find(params[:id])
  puts "SURVEY"
  p @survey
  question = @survey.questions.create(description: params[:description])
  puts "QUESTION"
  p question

  erb :"survey/_question", locals: {question: question}, layout: false
end
