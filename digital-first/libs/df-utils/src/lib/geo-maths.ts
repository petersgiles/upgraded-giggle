export function rad2degr(rad) { return rad * 180 / Math.PI }
export function degr2rad(degr) { return degr * Math.PI / 180 }

/**
 * @param latLngInDeg array of arrays with latitude and longtitude
 *   pairs in degrees. e.g. [[latitude1, longtitude1], [latitude2
 *   [longtitude2] ...]
 *
 * @return array with the center latitude longtitude pairs in
 *   degrees.
 */
export function getLatLngCenter(latlongs, latfield = 'latitude', lngfield = 'longitude') {

    let sumX = 0
    let sumY = 0
    let sumZ = 0

    for (let i = 0; i < latlongs.length; i++) {
        const lat = degr2rad(latlongs[i][latfield])
        const lng = degr2rad(latlongs[i][lngfield])
        // sum of cartesian coordinates
        sumX += Math.cos(lat) * Math.cos(lng)
        sumY += Math.cos(lat) * Math.sin(lng)
        sumZ += Math.sin(lat)
    }

    const avgX = sumX / latlongs.length
    const avgY = sumY / latlongs.length
    const avgZ = sumZ / latlongs.length

    // convert average x, y, z coordinate to latitude and longtitude
    const longitude = Math.atan2(avgY, avgX)
    const hyp = Math.sqrt(avgX * avgX + avgY * avgY)
    const latitude = Math.atan2(avgZ, hyp)

    const centre = {}
    centre[latfield] = rad2degr(latitude)
    centre[lngfield] = rad2degr(longitude)

    return centre
}