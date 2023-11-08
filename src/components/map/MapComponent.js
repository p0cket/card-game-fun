// MapNode component for each node on the map
const MapNode = ({ type, onClick, isCurrent, isVisited }) => {
  // Tailwind classes for different types of nodes
  const nodeClasses = `p-3 rounded-full ${
    isCurrent ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
  } ${isVisited ? 'opacity-50' : 'opacity-100'} m-1`
  return (
    <button
      onClick={onClick}
      className={`${nodeClasses} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300`}
    >
      {/* Icon or text representing the node */}
      {type}
    </button>
  )
}

// MapPath component for the paths between nodes
const MapPath = ({ isAvailable }) => {
  // Tailwind classes for the path
  const pathClasses = `w-full h-1 my-2 ${
    isAvailable ? 'bg-green-600' : 'bg-gray-400'
  }`
  return <div className={pathClasses}>{/* Path visualization */}</div>
}

// MapComponent that puts together the nodes and paths

const MapComponent = ({ mapData, currentLevel, onNodeClick }) => {
  // Function to find a node by its ID
  const findNodeById = (id) => {
    for (const level of mapData.levels) {
      const node = level.nodes.find((node) => node.id === id)
      if (node) {
        return node
      }
    }
    return null
  }

  // Function to determine if a path is available
  const isPathAvailable = (fromNode, toNodeId) => {
    return fromNode.leadsTo.includes(toNodeId)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {mapData.levels.map((level, levelIndex) => (
        <div key={levelIndex} className="flex flex-col items-center">
          {level.nodes.map((node, nodeIndex) => (
            <div key={nodeIndex} className="flex flex-col items-center">
              <MapNode
                type={node.type}
                onClick={() => onNodeClick(node)}
                isCurrent={currentLevel === levelIndex && node.isCurrent}
                isVisited={node.isVisited}
              />
              {levelIndex < mapData.levels.length - 1 &&
                node.leadsTo.map((toNodeId) => {
                  const toNode = findNodeById(toNodeId)
                  return (
                    <MapPath
                      key={toNodeId}
                      isAvailable={isPathAvailable(node, toNodeId)}
                    />
                  )
                })}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MapComponent
