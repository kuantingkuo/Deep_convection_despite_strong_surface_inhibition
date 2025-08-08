x1=11;x2=32
rc=gsfallow('on')
'reinit'
'ini -l'

'sdfopen INIC.interp2Wgrid_crop.nc'
'set x 'x1' 'x2
'set y 21.5'
'set z 1 20.5'
'set t 1'

x0=21.5
dx=0.5
xkm1=(x1-x0)*dx
xkm2=(x2-x0)*dx

'c'
'set xaxis 'xkm1' 'xkm2
'set ylint 1'
'set grads off'
'u0=const(maskout(u.1,lev>0),0,-u)'
'color 0 3 -kind dark_jet'
'set cthick 6'
'set arrscl 0.5 2'
'd u0;w;mag(u0,w)'
'xcbar3 -unit [m s`a-1`n]'
'draw xlab X [km]'
'draw ylab Height [km]'
'draw title Flow at 1 min. used as initial condition'
'off'
'color -levs -0.6 -0.3 -0.1 0.1 0.3 0.6 0.9 1.2 1.5 1.8 -kind black-(2)->gray->black -gxout contour'
'set clab forced'
'set cthick 6'
'd w'
'gxprint Fig2b.png white'
'gxprint Fig2b.svg white'
