import subprocess
import re


########################
# Check program versions
########################

node_v = subprocess.check_output(["node", "-v"])
node_loc = re.search('v[0-9]+.[0-9]+.[0-9]+', node_v)
if node_loc==None:
    print "No Nodejs found ... Please Install it"
    Exit(1);
else:
    node_v = node_v[1:len(node_v) -1];
    version = node_v.split('.', 2);
    if(int(version[0]) < 6):
        print "Please reinstall node. Current version is " + ".".join(version) + "\n This application requires 6.3.1"
        Exit(1);
    elif(int(version[0] == 6)):
	    if(int(version[1]) < 3):
	        print "Please reinstall node. Current version is " + ".".join(version) + "\n This application requires 6.3.1"
	        Exit(1);
	    elif(int(version[1]) == 3):
		    if(int(version[2]) < 1):
		        print "Please reinstall node. Current version is " + ".".join(version) + "\n This application requires 6.3.1"
		        Exit(1);

npm_v = subprocess.check_output(["npm", "-v"])
npm_loc = re.search("[0-9]+.[0-9]+.[0-9]+", npm_v)
if npm_loc==None:
    print "No NPM found ... Please Install it"
    Exit(1);

subprocess.check_output(["npm", "install"])
#Now we test for C library dependencies

env = Environment()
conf = Configure(env)

req_c_lib = None;
if env['PLATFORM']=='posix':
    print 'Platform is posix'
    req_c_lib = ['m', 'bsd', 'pthread', 'cbor', 'nanomsg', 'task', 'event', 'hiredis']
elif env['PLATFORM']=='darwin':
    print 'Platform is darwin'
    req_c_lib = ['cbor', 'nanomsg', 'task', 'event', 'hiredis']
else:
    print 'Windows not supported ...'
#required_libraries = ['m']

for iterating_var in req_c_lib:
    if not conf.CheckLib(iterating_var):
        print iterating_var + " library is missing .. "
        Exit(1);

c_files = Glob('lib/jamlib/c_core/*.c');

library = Library('jam', Glob('lib/jamlib/c_core/*.c'), LIBS=req_c_lib, LIBPATH = ['/usr/lib', '/usr/local/lib'])
c_core_files = Glob('./lib/jamlib/c_core/*.h');
ohm_c_files = Glob('./lib/ohm/c/*.js') + Glob('./lib/ohm/c/*.ohm')
ohm_ecma_files = Glob('./lib/ohm/ecmascript/*.js') + Glob('./lib/ohm/ecmascript/*.ohm')
ohm_jamscript_files = Glob('./lib/ohm/jamscript/*.js') + Glob('./lib/ohm/jamscript/*.ohm')
c_core_files.append("./lib/jamlib/c_core/duktape");

env.Install("/usr/local/bin", "jamc" );
env.Install("/usr/local/include/jam", c_core_files);
env.Install("/usr/local/share/jam", "jamc.js");
env.Install("/usr/local/share/jam", "LICENSE");
env.Install("/usr/local/share/jam", "node_modules");
compiled_library = env.Install("/usr/local/lib", "libjam.a");
env.Install("/usr/local/share/jam/lib/c_core", c_core_files);
env.Install('/usr/local/share/jam/lib/ohm/c', ohm_c_files);
env.Install('/usr/local/share/jam/lib/ohm/ecmascript', ohm_ecma_files);
env.Install('/usr/local/share/jam/lib/ohm/jamscript', ohm_jamscript_files);
env.Install('/usr/local/share/jam/deps/libtask/', "./deps/libtask/libtask.a");
env.Install('/usr/local/share/jam/lib/jserver', Glob('./lib/jserver/*.js'));

ib = env.Alias('install-bin', "/usr/local/bin");
il = env.Alias('install-share', "/usr/local/share/jam");
ii = env.Alias('install-include', "/usr/local/include/jam");
ill = env.Alias('install-lib', "/usr/local/lib");
a1 = env.Alias('a1', "/usr/local/share/jam/lib/c_core");
a2 = env.Alias('a2', '/usr/local/share/jam/lib/ohm/c');
a3 = env.Alias('a3', '/usr/local/share/jam/lib/ohm/ecmascript');
a4 = env.Alias('a4', '/usr/local/share/jam/lib/ohm/jamscript');
a5 = env.Alias('a5', '/usr/local/share/jam/deps/libtask');
a6 = env.Alias('a6', '/usr/local/share/jam/lib/jserver');

env.Alias('install', [ib, ii, il, il, il, ill, a1, a2, a3, a4, a5, a6])

Depends(compiled_library, library);