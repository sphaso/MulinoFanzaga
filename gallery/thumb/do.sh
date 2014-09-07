for i in *.jpg
do
convert $i -crop '100x100' TN_$i
echo $i processed
done
