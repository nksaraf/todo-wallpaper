which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
else
	echo "brew installed"
fi

if brew ls --versions python3 > /dev/null; then
  echo "python3 installed"
else
  brew install python3
fi

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

pip3 install Pillow todotxtio attrdict

mkdir -p ~/.todo
cp "$DIR/assets/"* ~/.todo
touch -a ~/.todo/todo.txt
touch -a ~/.todo/preferences.json

open "$DIR/assets/desktoppr-0.1.pkg"