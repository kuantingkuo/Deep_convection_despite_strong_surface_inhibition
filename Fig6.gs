*grads -a 1.5
case_VVM='ctrl_16'
tsels_VVM='2 9 15'
case_ACE='control13579_enhanced-condensate-loss_supercoolll'
tsels_ACE='3 9 52'
infile='inic_ctrl.txt'
path_VVM='MODEL_ROOT/VVM/DATA/GoAmazon_'case_VVM'_t06/'
path_ACE='MODEL_ROOT/ACE/'case_ACE'/'
rc=gsfallow('on')
'set rgb 99 30 180 30'
'set ccolor 99'
'reinit'
'q gxinfo'
line=sublin(result,2)
xpage=subwrd(line,4)-1e-7
ypage=subwrd(line,6)-1e-7
ypageM=ypage/2

'set mproj off'
'set display white'
'c'
'set font 1'
'set xlopts 1 2 0.3'
'set ylopts 1 2 0.3'

********** VVM ************
ypage1=ypage/2+0.2
dypage=ypage-ypage1
'open 'path_VVM'gs_ctl_files/thermodynamic.ctl'
'open 'path_VVM'gs_ctl_files/W.ctl'

'set x 56.5 72.5'
'set y 64'
'set z 2 13'
z0=qdims('levmin')/1000
z1=qdims('levmax')/1000

nt=3
it=1
dy=5.6
ylw=0.4
xpage2=ylw
while(it<=nt)
    t=subwrd(tsels_VVM,it)
    dxpage=(xpage+(nt-1)*ylw)/nt
    say dxpage
    xpage1=xpage2-ylw
    xpage2=xpage1+dxpage
    'set vpage 'xpage1' 'xpage2' 'ypage1' 'ypage
    say 'set vpage 'xpage1' 'xpage2' 'ypage1' 'ypage
    'q gxinfo'
    say result
    xp1=1.2; xp2=8; yp1=0.7; yp2=yp1+dy
    'set parea 'xp1' 'xp2' 'yp1' 'yp2
    say 'set parea 'xp1' 'xp2' 'yp1' 'yp2
    'on'
    'set grads off'
    'set t 't
    'cld1=qc.1+qi.1'
    'thv1=th.1*(1+0.608*qv.1-cld1)'
    'thv1env=amean(th.1*(1+0.608*qv.1-cld1),x=1,x=128,y=1,y=128)'
    'buo1=(thv1-thv1env)/thv1env*9.80616'
    'set xaxis -4 4'
    'set yaxis 'z0' 'z1' 1'
    clevs='-0.05 -0.04 -0.03 -0.02 -0.01 -0.005 0.005 0.01 0.02 0.03 0.04 0.05'
    'color -levs 'clevs' -kind blue-(5)->white->orange->red'
    'd buo1'
    if(it=1);'draw ylab Height [km]';endif
    ttt=math_format('%03g',t-1)
    'draw title VVM 0.99           `0'ttt' min.'
    'off'
    'set ccolor 4'
    'set clab masked'
    'set gxout contour'
    'set clevs 1e-2 1e-1 1 2 3 4'
    'set ccolor 99'
    'set cthick 4'
    'd cld1*1e3'
    'set ccolor 1'
    'set clab masked'
    'set cthick 2'
    'set clevs -4 -1 -0.25 0.25 1 4 16'
    'd w.2'
    it=it+1
endwhile
    'set vpage off'
    cnum=count_num(clevs)
    cols=range(17,16+cnum)
    levcol='16'
    i=1
    while(i<=cnum)
        levcol=levcol' '%subwrd(clevs,i)%' '%subwrd(cols,i)
        i=i+1
    endwhile
    'xcbar3 1 'xpage-1' 'ypageM+0.05' 'ypageM+0.2' -fw 0.11 -fh 0.132 -ft 3 -levcol 'levcol' -unit B [m s`a-2`n]'
'close 2'
'close 1'
************ ACE **********
ypage1=0
ypage2=dypage
*'open 'path_ACE'GoAmazon_idp314_kknw25cin_6aces-dynamic_means.16.ctl'
*'open 'path_ACE'GoAmazon_idp314_kknw25cin_6aces-dynamic_means.16_zm.ctl'
'open 'path_ACE'GoAmazon_idp314_kknw25cin_6aces-dynamic_means.16_enhanced-codensate-loss.ctl'
'open 'path_ACE'GoAmazon_idp314_kknw25cin_6aces-dynamic_means.16_enhanced-codensate-loss_zm.ctl'


nt=3
it=1
xpage2=ylw
while(it<=nt)
    t=subwrd(tsels_ACE,it)
    dxpage=(xpage+(nt-1)*ylw)/nt
    say dxpage
    xpage1=xpage2-ylw
    xpage2=xpage1+dxpage
    'set vpage 'xpage1' 'xpage2' 'ypage1' 'ypage2
    say 'set vpage 'xpage1' 'xpage2' 'ypage1' 'ypage2
    'q gxinfo'
    say result
    xp1=1.2; xp2=8; yp1=1; yp2=yp1+dy
    'set parea 'xp1' 'xp2' 'yp1' 'yp2
    say 'set parea 'xp1' 'xp2' 'yp1' 'yp2
    'on'
    'set grads off'
    'set t 't
    rc=make_sym('B','symB')
    rc=make_sym('qc*1e3','symqc')
    'set dfile 2'
    'set x 1'
    'set ylint 1'
    'rho=rho.2'
    'set x -3 5'
    'W=mf.2/rho'
    rc=make_sym('W','symW')
    'set dfile 1'
    'set lev 0.131528 6.06431'
    'set xaxis -4 4'
    'color -levs 'clevs' -kind blue-(5)->white->orange->red'
    'd symB'
*    'draw xlab [km]'
    if(it=1);'draw ylab Height [km]';endif
    ttt=math_format('%03g',t-1)
    'draw title ACE 0.99           `0'ttt' min.'
    'off'
    'set ccolor 4'
    'set clab masked'
    'set gxout contour'
    'set clevs 1e-2 1e-1 1 2 3 4'
    'set ccolor 99'
    'set cthick 4'
    'd symqc'
    'set ccolor 1'
    'set clab masked'
    'set cthick 2'
    'color -levs -4 -1 -0.25 0.25 1 4 16 -kind black->black -gxout contour'
    'd symW'
    it=it+1
endwhile
'gxprint Fig6.png white'
'gxprint Fig6.svg white'

function make_sym(var,new)
    'set x -3 5'
    'set z 1 62'
    ''new'=const('var',0,-u)'
    k=1
    while(k<=62)
        i=-3
        while(i<1)
            'set z 'k
            'set x 'i
            'lon0=lon'
            'lev0=lev'
            'set x '2-i
            'd 'var
            temp=subwrd(result,4)
            'set x -3 5'
            'set z 1 62'
            ''new'=const(maskout('new',(lon!=lon0)|(lev!=lev0)),'temp',-u)'
            i=i+1
        endwhile
    k=k+1
    endwhile

    return
