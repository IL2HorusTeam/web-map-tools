# Be sure to restart your server when you modify this file.

# Your secret key for verifying the integrity of signed cookies.
# If you change this key, all old signed cookies will become invalid!
# Make sure the secret is at least 30 characters and all random,
# no regular words or you'll be exposed to dictionary attacks.
MapTools::Application.config.secret_token = \
    ENV['HORUS_WEB_MAPTOOLS_SECRET_TOKEN'] || \
    'f70a5e30d5812a8e3446518d1bab747702326d52c0ff4fe20c12042bd57e361a578e97bf986c84c7e8996a6cc00c1d6bb66fadb2ea640d8a014dca49e3544d61'
