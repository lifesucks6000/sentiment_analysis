import sys
import json


def sum1(a , b):
    return a+b

#ans = sum1(int(sys.argv[1]), int(sys.argv[2]))

resp = {
    "Name" : "Naveen",
    "Age" : 22,
    "Designation" : "Software Engineer",

}

print(json.dumps(resp))

sys.stdout.flush()
