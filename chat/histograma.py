#!/usr/bin/env python

import json
import csv
import numpy
import sys
import MySQLdb
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot
from matplotlib.ticker import FuncFormatter

def main(file_hist):
	game_results = load_results()
	opiniones = get_opinion_3(game_results)
	plot_histograma(opiniones,file_hist)


def load_results():
	#db = MySQLdb.connect(host="localhost",user="root",passwd="patton55",db="chat")

	db = MySQLdb.connect(host="localhost",user="balen",passwd="Aid8Tez8EeNg4ea1",db="balen")

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

def number_of_rounds(game_results):
	return len(game_results['played_rounds'])

def get_opinion_3(game_results):
	n = number_of_rounds(game_results)
	opiniones = [0]*3
	for op in game_results['opinion_changes']:
		if int(op['ronda']) == n:
			opiniones[int(op['value'])/3] += 1
	k = sum(opiniones)
	opiniones = [float(i)/k for i in opiniones]
	return opiniones

def to_percent(y, position):
	# Ignore the passed in position. This has the effect of scaling the default
	# tick locations.
	s = str(100 * y)

	# The percent symbol needs escaping in latex
	if matplotlib.rcParams['text.usetex'] is True:
		return s + r'$\%$'
	else:
		return s + '%'

def plot_histograma(opiniones,file_hist):
	#print opiniones

	fig, ax = matplotlib.pyplot.subplots()
	matplotlib.pyplot.title('Histograma de Valoraciones')
	matplotlib.pyplot.ylabel('Porcentaje de Usuarios con cierta valoracion')
	ax.bar([0,1,2],opiniones,align='center')
	formatter = FuncFormatter(to_percent)
	matplotlib.pyplot.gca().yaxis.set_major_formatter(formatter)
	ax.set_ylim([0,1])
	ax.set_xlim([-0.75,2.75])
	ax.set_xticks(range(0,3))
	ax.set_xticklabels(['Ventaja Blancas','Tablas','Ventaja Negras'])
	matplotlib.pyplot.savefig(file_hist, dpi=None, facecolor='w', edgecolor='w',orientation='portrait', papertype=None, format=None,transparent=False, bbox_inches=None, pad_inches=0.1,frameon=None)
	matplotlib.pyplot.close()
	
if __name__ == "__main__":
	if len(sys.argv) != 2:
		print 'Usage: python analizador.py file_hist'
	else:
		file_hist = (sys.argv[1])
		main(file_hist)
