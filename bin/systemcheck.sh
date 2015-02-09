#
# checks system for global dependencies and minimum versions
#
# - node
# - npm
# - bower
# - grunt (checks for grunt-cli)
min_node='0.10.26'
min_npm='1.3.24'
min_bower='1.3.3'
min_grunt_cli='0.1.13'

# utilit fn, checks if cmd exists in system
#
# @param $1 cmd to check
# @param $2 cmd name to report in error message
# @param $3 version to report in error message
command_exists () {
    command -v $1 >/dev/null 2>&1 || {
        echo >&2 "ERROR: '$2' is required but was not found on this system. Please install version '$3' of greater.";
        exit 1;
    }
}

# compares two semvers
#
# @param $1 version to check
# @param $2 minversion to check against
# @returns 0 if dependency is at the exact version, -1 if higher, 1 if not met
version_compare () {
    if [[ $1 == $2 ]]
    then
        return 0
    fi
    local IFS=.
    local i ver1=($1) ver2=($2)
    # fill empty fields in ver1 with zeros
    for ((i=${#ver1[@]}; i<${#ver2[@]}; i++))
    do
        ver1[i]=0
    done
    for ((i=0; i<${#ver1[@]}; i++))
    do
        if [[ -z ${ver2[i]} ]]
        then
            # fill empty fields in ver2 with zeros
            ver2[i]=0
        fi
        if ((10#${ver1[i]} > 10#${ver2[i]}))
        then
            return -1
        fi
        if ((10#${ver1[i]} < 10#${ver2[i]}))
        then
            return 1
        fi
    done
    return 0
}

# checks if cmd exists in system
# exists with (1) if dependency not met
#
# @param $1 detecteed version
# @param $2 dependency name
# @param $3 desired minimum version
version_require () {
    version_compare $2 $3
    if [[ $? == 1 ]]
    then
        echo >&2 "ERROR: '$1' version '$2' is old. Please update it to version '$3' or greater."
        exit 1;
    fi
}

# utilit fn, installs an npm package
#
# @param $1 pkg to install
npm_install () {
    file="./node_modules/$1/package.json"
    if [ ! -f $file ];
    then
        echo "npm install $1 ..."
        npm --loglevel warn install $1 > /dev/null
    fi
}

command_exists node node $min_node
command_exists npm npm $min_npm
command_exists bower bower $min_bower
command_exists grunt grunt-cli $min_grunt_cli

node=$(node --version 2>&1 | sed -E 's/v(.*)/\1/');
npm=$(npm --version);
bower=$(bower --version);
grunt_cli=$(grunt --version 2>&1 | tr '\n' ' ' | sed -E 's/^grunt-cli v([0-9.]*)( grunt .*)?/\1/');

version_require node $node $min_node
version_require npm $npm $min_npm
version_require bower $bower $min_bower
version_require grunt $grunt_cli $min_grunt_cli

npm_install colors
npm_install execSync
