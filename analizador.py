import json
import csv
import numpy
import sys

def main(datos,opinion,oponente):
	game_results = load_results(datos)
	opinion_matrix = get_opinion_matrix(game_results)
	print_matrix(opinion_matrix,opinion)
	oponent_matrix = get_oponent_matrix(game_results,opinion_matrix)
	print_matrix(oponent_matrix,oponente)



def load_results(file_in):
	f = open(file_in,'r')
	return json.load(f)

def get_opinion_matrix(game_results):
	n = number_of_players(game_results)
	res = numpy.zeros((n, n))
	min_p = min_player(game_results)
	op = game_results['opinion_changes']
	for opinion in op:
		res[int(opinion['ronda'])][int(opinion['userID']) - min_p] = int(opinion['value'])

	return res

def get_oponent_matrix(game_results,opinion_matrix):
	n = number_of_players(game_results)
	res = numpy.zeros((n, n))
	min_p = min_player(game_results)
	for i in xrange(0,n-1):
		for (x,y) in game_results['game'][game_results['played_rounds'][i]]:
			x = int(x) - min_p
			y = int(y) - min_p
			res[i+1][x] = opinion_matrix[i][y]
			res[i+1][y] = opinion_matrix[i][x]
	return res

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