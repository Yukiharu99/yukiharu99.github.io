import os
import json
import re
import sys

mypath = 'F:\Códigos\Python3\AzurLaneDataCollect\Icons\Personagens'
files = [f for f in os.listdir(mypath) if os.path.isfile(os.path.join(mypath, f))]

jsonArrayStr = ''

for icon in files:
    temp = icon
    temp = re.sub('Icon|(Icon)', '', icon)[:-4]
    temp = re.sub('_', ' ', temp)
    jsonArrayStr = jsonArrayStr + ',{\"shipname\":\"' + temp + '","dir":"img/shipgirlIcon/' + icon + '"}'

jsonArrayStr = '[' + jsonArrayStr[1:] + ']'

jsonFile = json.loads(jsonArrayStr)

try:
    with open('shipgirlIconDirs.json','w', encoding='utf8') as dirFile:
        json.dump(jsonFile, dirFile, indent=4, sort_keys=True, ensure_ascii=False)
    print('Sucesso!')
except Exception as erro:
    sys.exit("Falha ao escrever arquivo JSON:\n" + str(erro))