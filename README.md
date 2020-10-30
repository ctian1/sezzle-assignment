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

simply deploy the server to heroku or:

```
cd server
python install -r requirements.txt
python app.py
```

you will need to change the socket.io URL in the client js