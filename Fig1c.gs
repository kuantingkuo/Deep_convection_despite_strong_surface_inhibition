files1='Init_CIN_lin58 Init_CIN_ctrl'
files2='W2CIN_lin58 W2CIN_ctrl'
exps='RH-reduced CTRL'
colors='60 1'
'set rgb 60 0 125 0'
rc=gsfallow('on')
num=count_num(files1)
'reinit'
'ini -h'
'set parea 3 8 0.8 7.5'
n=1
while(n<=num)
    file1=subwrd(files1,n)
    file2=subwrd(files2,n)
    exp.n=subwrd(exps,n)
    'open 'file1'.ctl'
    'set z 1 10.3135'
    'cin'n'=if(max(cin.1,z=0,z+0)>1e-3,0,cin.1)'
    'close 1'
    'open 'file2'.ctl'
    'set z 1 10.3135'
    'w'n'=w.1'
    if(n<num)
        'close 1'
    endif
    n=n+1
endwhile

n=1
while(n<=num)
color=subwrd(colors,n)
'set grads off'
'set vrange -145 145'
'set xlevs -140 -105 -70 -35 0'
'set ylint 1'
'set cmark 3'
'set cthick 8'
'set ccolor 'color
'd cin'n
if(n=1)
'set string 1 bc 5'
'set strsiz 0.16 0.2'
'draw string 4.25 0.15 CIN [J kg`a-1`n]'
'draw ylab Initial Parcel Height [km]'
'off'
endif
'set font 0'
'set xlab on'
'set grid on'
'set vrange -17 17'
'set xlevs 0 4 8 12 16'
'set cmark 2'
'set cthick 8'
'set ccolor 'color
'd w'n
'off'
if(n=1)
'set string 1 bc 5'
'set strsiz 0.16 0.2'
'draw string 6.75 0.15 `2w`bC`n`0 [m s`a-1`n]'

'set cmark 0'
'set cthick 12'
'set ccolor 15'
'd const(w'n',0,-a)'
endif
n=n+1
endwhile
'set tile 99 4 36 36 5 15'
'set rgb 99 tile 99'
'set line 99'
'draw recf 3 4.1 8 7.5'
'legend tl 1 `1CIN 1 3'
'legend tr 1 `2w`bC`n`1 1 2'
'gxprint Fig1c.png white'
'gxprint Fig1c.svg white'
