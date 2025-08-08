import xarray as xr
import numpy as np
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import matplotlib.pyplot as plt
import matplotlib.colors as mcolors

# Open dataset
ds = xr.open_dataset('GRIDSAT-B1.2014.11.22.06.v02r01.nc') # this file can be found at https://www.ncei.noaa.gov/data/geostationary-ir-channel-brightness-temperature-gridsat-b1/access/2014/
dataarray = ds.irwin_cdr

# Define Amazon region
lat_min, lat_max = -18, 15
lon_min, lon_max = -85, -41

# Subset the data
data_subset = dataarray.isel(time=0).sel(
    lat=slice(lat_min, lat_max),
    lon=slice(lon_min, lon_max)
)

# Create figure
fig = plt.figure(figsize=(12.6, 10))
ax = plt.subplot(1, 1, 1, projection=ccrs.PlateCarree())

# Add coastlines and features
ax.add_feature(cfeature.COASTLINE, linewidth=1.5)
ax.add_feature(cfeature.BORDERS, linewidth=0.7)
ax.add_feature(cfeature.LAKES, edgecolor='aqua', facecolor='none', alpha=0.3)
ax.add_feature(cfeature.RIVERS, edgecolor='aqua', facecolor='none', alpha=0.3)

# Create a custom colormap for 200K-280K
cmap_jet = plt.cm.spring(np.linspace(0, 1, 7))[:,:3]  # Reverse jet (red to blue) for 200-230K
cmap_gray_white = np.linspace((1, 1, 1), (0.4, 0.4, 0.4), 10)  # White to gray for 230-280K

# Combine both colormaps
combined_colors = np.vstack((cmap_jet, cmap_gray_white))
cmap_combined = mcolors.ListedColormap(combined_colors)

# Define boundaries to match the two ranges
boundaries = np.concatenate((np.arange(195, 230, 5), np.arange(230, 281, 5)))
norm = mcolors.BoundaryNorm(boundaries, cmap_combined.N)

# Plot the data
pcm = ax.pcolormesh(
    data_subset.lon,
    data_subset.lat,
    data_subset,
    cmap=cmap_combined,
    norm=norm,
    shading='auto',
    transform=ccrs.PlateCarree()
)

# Add a blue hollow circle at 3.21S, 60.6W
ax.plot(-60.6, -3.21, marker='o', color='none', markersize=14, markeredgewidth=2, markeredgecolor='blue', transform=ccrs.PlateCarree())

# Colorbar
cb = fig.colorbar(pcm, ax=ax, orientation='vertical', pad=0.02, aspect=20, shrink=0.8)
cb.set_label('[K]', fontsize=24)  # Increase font size
cb.set_ticks(np.arange(200, 281, 10))  # Add specified ticks
cb.ax.tick_params(labelsize=24)  # Increase font size
cb.ax.invert_yaxis()  # Reverse the order of the color bar

# Set map extent
ax.set_extent([lon_min, lon_max, lat_min, lat_max], crs=ccrs.PlateCarree())

# Add lat/lon ticks
ax.set_xticks(np.arange(-80, -40, 10), crs=ccrs.PlateCarree())
ax.set_yticks(np.arange(-10, 20, 10), crs=ccrs.PlateCarree())
ax.xaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{abs(x):.0f}°{"W" if x < 0 else "E"}'))
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda y, _: f'{abs(y):.0f}°{"S" if y < 0 else ("N" if y > 0 else "")}'))
ax.tick_params(axis='both', which='major', labelsize=24)  # Increase font size for lat/lon labels

# Add lat/lon grids
gl = ax.gridlines(draw_labels=False, linewidth=0.5, color='black', alpha=0.5, linestyle='--')
gl.xlocator = plt.FixedLocator(np.arange(-80, -40, 10))
gl.ylocator = plt.FixedLocator(np.arange(-10, 20, 10))

# Title
ax.set_title('   Brightness Temperature  2014-11-22 06 UTC', fontsize=28)

plt.tight_layout()
plt.savefig('Fig1d.png', dpi=300)
plt.show()
