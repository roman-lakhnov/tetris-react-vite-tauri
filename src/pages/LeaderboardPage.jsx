const LeaderboardPage = () => {
  const leaderboardData = [
    { name: 'ShadowSlayer', score: 1850, time: '02:15' },
    { name: 'PixelPhantom', score: 1420, time: '03:10' },
    { name: 'GlitchMaster', score: 1980, time: '01:45' },
    { name: 'NeonKnight', score: 1600, time: '02:30' },
    { name: 'CyberRogue', score: 2100, time: '01:20' },
    { name: 'ByteCrusher', score: 1750, time: '02:05' },
    { name: 'GhostHacker', score: 1230, time: '03:50' },
    { name: 'DarkVortex', score: 890, time: '04:30' },
    { name: 'QuantumFury', score: 1950, time: '01:55' },
    { name: 'ZeroGravity', score: 1570, time: '02:40' },
  ]

  // Сортируем игроков по убыванию очков
  const sortedLeaderboard = [...leaderboardData].sort(
    (a, b) => b.score - a.score
  )

  return (
    <div className='d-flex flex-column align-items-center justify-content-center vh-100'>
      {/* Карточка для таблицы лидеров */}
      <div
        className='card shadow-lg p-4'
        style={{
          width: '40%',
          maxWidth: '900px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
        }}
      >
        <h1 className='text-center mb-4'>Best Players</h1>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.map((player, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeaderboardPage
