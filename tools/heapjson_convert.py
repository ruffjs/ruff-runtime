#!/usr/bin/python
#
#  Convert a HeapDump JSON file into a more useful format.
#
#  XXX: right now emits a heap graph.
#

import os
import sys
import json

add_proto = False
add_props = True

def main():
	f = open(sys.argv[1], 'rb')
	heapdump = json.loads(f.read())
	f.close()

	objs = {}
	for obj in heapdump['heapObjects']:
		objs[obj['ptr']['pointer']] = obj

	f = sys.stdout

	def is_obj(x):
		if not objs.has_key(x):
			return False
		return objs[x]['type'] == 2 | objs[x]['type']  == 3

	def emit(x, y):
		# XXX: only emit edges between objects (not strings or buffers)
		if is_obj(y):
			f.write('h%s -> h%s\n' % (x, y))

	f.write('digraph heap {\n')
	#f.write('Source,Target\n')
	for obj in heapdump['heapObjects']:
		x = obj['ptr']['pointer']
		if add_proto and obj.has_key('proto'):
			f.write('h%s -> h%s;\n' % (x, obj['proto']['pointer']))
			#f.write('h%s,h%s\n' % (x, obj['proto']['pointer']))
		if add_props and obj.has_key('props'):
			for p in obj['props']:
				if p.has_key('key'):
					emit(x, p['key']['pointer'])
				if p.has_key('value') and isinstance(p['value'], dict) and p['value'].has_key('pointer'):
					emit(x, p['value']['pointer'])
		if add_props and obj.has_key('array'):
			for p in obj['array']:
				if p.has_key('value') and isinstance(p['value'], dict) and p['value'].has_key('pointer'):
					emit(x, p['value']['pointer'])
	f.write('}\n')

if __name__ == '__main__':
	main()
