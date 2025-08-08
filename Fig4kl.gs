*grads -a 0.625
exp_tag='ctrl_mimic'
name='CTRL'
sels='9'
exps='0.06 0.16 0.29 0.36 0.51 0.66 0.83 0.99 1.17 1.35 1.55 1.76'
cases='-448_000 -448_090 -448_180 -448_270 005_000 005_090 005_180 005_270 448_000 448_090 448_180 448_270'
rc=gsfallow('on')
'reinit'
'q gxinfo'
line=sublin(result,2)
xpage=subwrd(line,4)-0.00001
ypage=subwrd(line,6)

path='MODEL_ROOT/SPCAM/GoAmazon_'exp_tag'/'

'set mproj off'
'set display white'
'c'
'set font 1'
'set xlopts 1 4 0.17'
'set ylopts 1 4 0.17'
    j=1
    i=subwrd(sels,j)
    case=subwrd(cases,i)
    'open 'path'SAM_'case'.ctl'
    xmax=qdims('xmax')
    'set x 1'
    'set lev 0 16000'
    z0=qdims('levmin')/1000
    z1=qdims('levmax')/1000
    'set time 00Z 03Z'
    'tvc=tabs*(1+0.608*qv-qcl-qci-qpl-qpi)'
    'tve=mean(tabs*(1+0.608*qv-qcl-qci-qpl-qpi),x=1,x=32)'
    'buo=9.80616*(tvc-tve)/tve'
    'cldc=qcl+qci'
j=2
while(j<=3)

    ypage1=ypage-j*ypage/3
    ypage2=ypage-(j-1)*ypage/3
    if(j>1)
        ypage1=ypage1+0.2*(j-1)
        ypage2=ypage2+0.2*(j-1)
    endif
    if(j=3)
        ypage1=0
    endif
    dy=ypage2-ypage1
    'set vpage 0 'xpage' 'ypage1' 'ypage2
say    'set vpage 0 'xpage' 'ypage1' 'ypage2
    xp1=0.8; xp2=xpage-1.375-0.3; yp1=dy-3; yp2=dy-0.1
    'set parea 'xp1' 'xp2' 'yp1' 'yp2
say    'set parea 'xp1' 'xp2' 'yp1' 'yp2
    'on'
    'set grads off'
    'set xlabs 00:00|00:30|01:00|01:30|02:00|02:30|03:00'
    'set yaxis 'z0' 'z1
    'color -levs -0.05 -0.04 -0.03 -0.02 -0.01 -0.005 0.005 0.01 0.02 0.03 0.04 0.05 -kind blue-(5)->white->orange->red'
    'd buo'
    exp=subwrd(exps,i)
    'set strsiz 0.14 0.18'
    'set string 1 tl 5'
    'draw string 'xp1+0.05' 'yp2-0.4' SPCAM `0'name
    'draw string 'xp1+0.05' 'yp2-0.61' `0'exp
    if(j=3)
        'draw xlab Time'
    endif
    'off'
    'set gxout contour'
    if(j=2)
    'set cthick 3'
    'set clab masked'
    'color -levs -4 -1 -0.25 0.25 1 4 16 -kind black->black -gxout contour'
    'd w'
    endif
    if(j=3)
    'set cthick 5'
    'set rgb 99 30 180 30'
    'set ccolor 99'
    'set clab masked'
    'set clevs 1e-2 1e-1 1 2 3 4'
    'd cldc*1e3'
    endif
    j=j+1
endwhile
'set vpage off'

'color -levs -0.05 -0.04 -0.03 -0.02 -0.01 -0.005 0.005 0.01 0.02 0.03 0.04 0.05 -kind blue-(5)->white->orange->red'
levs='-0.05 -0.04 -0.03 -0.02 -0.01 -0.005 0.005 0.01 0.02 0.03 0.04 0.05'
nlev=count_num(levs)
cols=range(16,16+nlev)
levcol=subwrd(cols,1)
i=1
while(i<=nlev)
    levcol=levcol' 'subwrd(levs,i)' 'subwrd(cols,i+1)
    i=i+1
endwhile
'xcbar3 5.6 5.8 1 10 -fwidth 0.15 -fheight 0.18 -fthickness 4 -levcol 'levcol' -unit [m s`a-2`n]'
'gxprint Fig4kl.png white x500 y800'
'gxprint Fig4kl.svg white'
