blockname="simple-card"
composedname="wp-idg-ufr__block-$blockname"

if ! command -v npm &> /dev/null
then
	echo "npm is not installed: install npm with 'sudo apt-get install npm'"
	exit 1
fi

if ! command -v zip &> /dev/null
then
	echo "zip is not installed: install zip with 'sudo apt-get install zip'"
	exit 1
fi

rm $composedname.zip

npm run build &&

mkdir $composedname &&
cp -r ./build ./$composedname &&
cp ./block.json ./$composedname &&
cp ./$composedname.php ./$composedname &&

zip $composedname.zip ./$composedname -r &&
rm -rf ./$composedname &&

echo "Done. Packed file: $composedname.zip"
