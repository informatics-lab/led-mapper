# set equal to the array you would like to interpolate
mapping =

original = []
for index, coord in enumerate(mapping):

    original.append(coord)

    if index < 150 or index > 979:
        continue

    if coord == [0, 0]:
        prev_index = index - 1
        prev_mapping = mapping[prev_index]

        for index2, coord2 in enumerate(mapping[index:]):
            if coord2 != [0, 0]:
                end_index = index+index2
                end_mapping = coord2
                break

        #we have both indexes and coords
        diffx = end_mapping[0] - prev_mapping[0]
        diffy = end_mapping[1] - prev_mapping[1]
        diff_index = end_index - prev_index

        stepx = int(diffx / diff_index)
        stepy = int(diffy / diff_index)

        for i in range(diff_index):
            if i != 0:
                mapping[prev_index + i] = [prev_mapping[0]+(stepx*i),prev_mapping[1]+(stepy*i)]

for i,coord in enumerate(original):
    print(i, coord, mapping[i])

print(mapping)
