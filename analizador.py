import json
import csv
import numpy
import sys
import re

def main(datos,opinion,oponente):
	game_results = load_results(datos)
	players,players_map = get_players(game_results)
	print_matrix(players,opinion)
	opinion_matrix = get_opinion_matrix(game_results,players_map)
	print_matrix(opinion_matrix,opinion)
	oponent_matrix = get_oponent_matrix(game_results,players_map)
	print_matrix(oponent_matrix,oponente)
	argument_matrix = get_argument_matrix(game_results,players_map)
	print_matrix(argument_matrix,oponente)
	messages = get_messages(game_results,players_map,oponent_matrix)



def load_results(file_in):
	db = MySQLdb.connect(host="localhost",user="root",passwd="patton55",db="chat")

	#db = MySQLdb.connect(host="localhost",user="balen",passwd="Aid8Tez8EeNg4ea1",db="balen")

	cursor = db.cursor()

	# execute SQL select statement
	cursor.execute("SELECT data FROM results WHERE id = (SELECT max(id) FROM results)")
	#cursor.execute("SELECT data FROM results WHERE id = 262")

	# commit your changes
	db.commit()

	# get the number of rows in the resultset
	
	# get and display one row at a time.
	row = cursor.fetchone()
	#print row[0]
	return json.loads(row[0])

def get_players(game_results):
	round_one = game_results['game'][0]
	res = []
	for p in round_one:
		res.append(int(p[0]))
		res.append(int(p[1]))
	res.sort()
	players_map = {}
	for i in xrange(0,len(res)):
		players_map[res[i]] = i
	return res,players_map


def get_opinion_matrix(game_results,players_map):
	n = number_of_players(game_results)
	res = numpy.zeros((n, n))
	op = game_results['opinion_changes']
	for opinion in op:
		res[int(opinion['ronda'])][players_map[int(opinion['userID'])]] = int(opinion['value'])
	return res;	

def get_oponent_matrix(game_results,players_map):
	n = number_of_players(game_results)
	res = numpy.zeros((n, n))
	for i in xrange(0,n-1):
		ronda = game_results['played_rounds'][i]
		for (x,y) in game_results['game'][ronda]:
			x = players_map[int(x)]
			y = players_map[int(y)]
			res[i+1][x] = y
			res[i+1][y] = x
	return res

def get_oponent_matrix(game_results,players_map):
	n = number_of_players(game_results)
	res = [[[] for j in xrange(n)] for i in xrange(n)]
	for arg in game_results['arguments']:
		res[int(arg['ronda'])][players_map[int(arg['userID'])]].append( (int(arg['value']),int(arg['color'])) )
	for arg in game_results['movidas']:
		res[int(arg['ronda'])][players_map[int(arg['userID'])]].append( (arg['pieza'],arg['columna'],int(arg['fila']),int(arg['color'])) )
	
	return res

def get_messages(game_results,players_map,oponent_matrix):
	pattern = re.compile("Comienza la ronda (\d*)")
	n = number_of_players(game_results)
	res_aux =  [[] for i in xrange(0,n+1)]
	for m in game_results['messages']:
		if m["userRole"] == "4":
			matches = pattern.match(m["text"])
			if matches:
				ronda = int(matches.groups()[0])
			continue
		if m["userRole"] == "1":
			res_aux[ronda].append(m)
	#Tengo los mensajes agrupados por ronda, falta dentro de eso agrupar por par de usuarios
	res =  [[] for i in xrange(0,n+1)]
	for i in xrange(0,len(res_aux)):
		aux = []
		for r in res_aux[i]:
			



def number_of_players(game_results):
	return len(game_results['played_rounds']) + 1

def min_player(game_results):
	return min([int(item) for sublist in game_results['game'] for subsublist in sublist for item in subsublist])


def print_matrix(matrix,file_out):
	with open(file_out, 'wb') as csvfile:
		spamwriter = csv.writer(csvfile, delimiter=',',quotechar='"', quoting=csv.QUOTE_MINIMAL)
		for i in xrange(0,len(matrix)):
			spamwriter.writerow(matrix[i])


if len(sys.argv) != 4:
	print 'Usage: python analizador.py datos opinion oponente'
else:
	datos = (sys.argv[1])
	opinion = (sys.argv[2])
	oponente = (sys.argv[3])
	main(datos,opinion,oponente)