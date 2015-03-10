echo "=== Pokemon Sprites ==="
echo "Creating Pokemon sprites directory..."
mkdir client/assets/sprites/pokemon
cd client/assets/sprites/pokemon
echo "Downloading Pokemon sprites..."
curl -L https://www.dropbox.com/s/sy9pcrk3vpzogpt/sprites.tar.gz?dl=1 -o sprites.tar.gz
echo "Extracting Pokemon sprites..."
tar xf sprites.tar.gz
echo "Removing compressed file..."
rm sprites.tar.gz
echo "Done with Pokemon Sprites"
echo "=== npm install =="
cd ../../../..
sleep 2
echo "Setting up server's npm install for server directory"
(cd server && npm install)
echo "Done with server's npm install"
echo "Setting up miscellaneous tasks"
sleep 2
mkdir server/app/maps
mkdir server/map_src/.hashes
mkdir client/assets/maps
