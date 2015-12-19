import json
import csv
import numpy
import sys
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.ticker import FuncFormatter

def main(datos,file_hist):
	game_results = load_results(datos)
	opiniones = get_opinion_3(game_results)
	plot_histograma(opiniones,file_hist)


def load_results(file_in):
	f = open(file_in,'r')
	return json.load(f)

def number_of_rounds(game_results):
	return len(game_results['played_rounds'])

def get_opinion_3(game_results):
	n = number_of_rounds(game_results)
	opiniones = [0]*3
	for op in game_results['opinion_changes']:
		if int(op['ronda']) == n:
			opiniones[int(op['value'])/3] += 1
	opiniones[0] = 2
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
	print opiniones

	fig, ax = plt.subplots()
	plt.title('Histograma de Valoraciones')
	plt.ylabel('Porcentaje de Usuarios con cierta valoracion')
	ax.bar([0,1,2],opiniones,align='center')
	formatter = FuncFormatter(to_percent)
	plt.gca().yaxis.set_major_formatter(formatter)
	ax.set_ylim([0,1])
	ax.set_xlim([-0.75,2.75])
	ax.set_xticks(range(0,3))
	ax.set_xticklabels(['Ventaja Blancas','Tablas','Ventaja Negras'])
	ax.legend()
	plt.savefig(file_hist, dpi=None, facecolor='w', edgecolor='w',orientation='portrait', papertype=None, format=None,transparent=False, bbox_inches=None, pad_inches=0.1,frameon=None)
	plt.close()

if len(sys.argv) != 3:
	print 'Usage: python analizador.py datos file_hist'
else:
	datos = (sys.argv[1])
	file_hist = (sys.argv[2])
	main(datos,file_hist)