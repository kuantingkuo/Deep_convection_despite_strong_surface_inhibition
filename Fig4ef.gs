*grads -a 0.5
exp_tag='control13579_enhanced-condensate-loss_supercoolll'
name='CTRL'
sels='4 6'
exps='0.06 0.16 0.29 0.36 0.51 0.66 0.83 0.99 1.17 1.35 1.55 1.76'
rc=gsfallow('on')
num=count_num(sels)
'reinit'
'set xsize 400 800'
'q gxinfo'
line=sublin(result,2)
xpage=subwrd(line,4)-0.00001
ypage=subwrd(line,6)

path='MODEL_ROOT/ACE/'
pattern='GoAmazon_idp314_kknw25cin_6aces-dynamic_means.??_enhanced-codensate-loss.ctl'
cases=sys('ls -d 'path%exp_tag'/'pattern'|awk -F/ ''{print $NF}''')

'set mproj off'
'set display white'
'c'
'set font 1'
'set xlopts 1 4 0.17'
'set ylopts 1 4 0.17'
j=1
while(j<=num)
    i=subwrd(sels,j)
    case=subwrd(cases,i)
    filename=sys('basename ""'case'"" .ctl')
    path='MODEL_ROOT/ACE/'exp_tag'/'subwrd(filename,1)
    'open 'path'.ctl'
    'open 'path'_zm.ctl'
    'set x 1'
    'set y 1'
    'set lev 0 16'
    'set time 00Z 03Z'
    'buo=(B.1(x=1)*0.25+B.1(x=2)*2)/2.25'
    'cldc=(qc(x=1)*0.25+qc(x=2)*2)/2.25'
    'set dfile 2'
    'wa=(mf.2(x=1)*0.25+mf.2(x=2)*2)/2.25/rho.2'
    'set dfile 1'

    ypage1=ypage-j*ypage/3
    ypage2=ypage-(j-1)*ypage/3
    if(j>1)
        ypage1=ypage1+0.2*(j-1)
        ypage2=ypage2+0.2*(j-1)
    endif
    if(j=num)
        ypage1=0
    endif
    dy=ypage2-ypage1
    'set vpage 0 'xpage' 'ypage1' 'ypage2
say    'set vpage 0 'xpage' 'ypage1' 'ypage2
    xp1=0.8; xp2=xpage-0.3; yp1=dy-3; yp2=dy-0.1
    'set parea 'xp1' 'xp2' 'yp1' 'yp2
say    'set parea 'xp1' 'xp2' 'yp1' 'yp2
    'on'
    'set grads off'
    'set xlabs 00:00|00:30|01:00|01:30|02:00|02:30|03:00'
    'color -levs -0.05 -0.04 -0.03 -0.02 -0.01 -0.005 0.005 0.01 0.02 0.03 0.04 0.05 -kind blue-(5)->white->orange->red'
    'd buo'
    exp=subwrd(exps,i)
    'set strsiz 0.14 0.18'
    'set string 1 tl 5'
    'draw string 'xp1+0.05' 'yp2-0.4' ACE `0'name
    'draw string 'xp1+0.05' 'yp2-0.61' `0'exp
    'off'
    'set gxout contour'
    'set cthick 3'
    'set clab masked'
    'color -levs -4 -1 -0.25 0.25 1 4 16 -kind black->black -gxout contour'
    'd wa'
    'set cthick 6'
    'set rgb 99 30 180 30'
    'set ccolor 99'
    'set clab masked'
    'set clevs 1e-2 1e-1 1 2 3 4'
    'd cldc*1e3'
    'close 2'
    'close 1'
    j=j+1
endwhile
'gxprint Fig4ef.png white x400 y800'
'gxprint Fig4ef.svg white'
