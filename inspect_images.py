from PIL import Image
files=['src/assets/iphones/14promax-front.jpg','src/assets/iphones/14promax-back.jpg']
for f in files:
    img=Image.open(f)
    print('\nFILE',f,'SIZE',img.size,'MODE',img.mode)
    for name, box in [('top',(0,0,img.width,10)),('bottom',(0,img.height-10,img.width,img.height)),('left',(0,0,10,img.height)),('right',(img.width-10,0,img.width,img.height))]:
        crop=img.crop(box)
        colors=crop.getcolors(maxcolors=100000)
        print(name,'unique',len(colors),'top5',sorted(colors,key=lambda x:x[0],reverse=True)[:5])
