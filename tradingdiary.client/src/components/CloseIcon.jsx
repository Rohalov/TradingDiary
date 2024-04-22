
function CloseIcon({ height, width }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height={`${height}px`} width={`${width}px`} viewBox={`0 0 ${height} ${width}`} >
            <path d="M18 6L6 18M18 18L6 6" stroke="currentColor" stroke-width="1" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
    )
}

export default CloseIcon