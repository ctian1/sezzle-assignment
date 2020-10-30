# Calculator

[demo](https://chris-sezzle-assignment.herokuapp.com)

## Supported expressions (all functions from python math)

```python
1 + 2 / 3 * 4
sqrt(10)
degrees(pi*2)
pow(10,2)
log(1000,10)
sin(pi/2)
10**2
1 < 2
[ a*2 for a in [1, 2, 3, 4] ]
True and False
```

## Instructions

first, build the client

```
cd client
npm i
npm run build
cd ..
cp client/build/. server/static/
```

then simply start the server:

```
cd server
python install -r requirements.txt
python app.py
```

or 

deploy the server to heroku:

```
cd server
heroku git:remote -a <heroku app name>
git add .
git commit -m "update"
git push heroku master
```

you will also need to change the socket.io URL in the client js
