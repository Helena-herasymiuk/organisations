require 'sinatra'
require 'rest-client'
require 'json'

CLIENT_ID = ENV['62a57547f37bc331702d']
CLIENT_SECRET = ENV['fad0416ac5fc57f9fdd7ac1cfe262044aec0d1a0']

get '/' do
  erb :index, :locals => {:client_id => CLIENT_ID}
end
get '/callback' do
  # get temporary GitHub code...
  session_code = request.env['rack.request.query_hash']['code']

  # ... and POST it back to GitHub
  result = RestClient.post('https://github.com/login/oauth/access_token',
                          {:client_id => CLIENT_ID,
                           :client_secret => CLIENT_SECRET,
                           :code => session_code},
                           :accept => :json)

  # extract the token and granted scopes
  access_token = JSON.parse(result)['84110bd88775e29e8e1e885c572a94675a2b8e2a
  	']
end
# fetch user information
auth_result = JSON.parse(RestClient.get('https://api.github.com/user',
                                        {:params => {:access_token => access_token}}))

# if the user authorized it, fetch private emails
if has_user_email_scope
  auth_result['private_emails'] =
    JSON.parse(RestClient.get('https://api.github.com/user/emails',
                              {:params => {:access_token => access_token}}))
end

erb :basic, :locals => auth_result