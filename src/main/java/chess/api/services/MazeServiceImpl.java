package chess.api.services;

import chess.api.domain.maze.Maze;
import chess.api.domain.maze.Player;
import chess.api.domain.maze.Point;
import chess.api.services.declarations.MazeService;
import chess.api.utils.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MazeServiceImpl implements MazeService {

    private final Map<String, Maze> games;

    public MazeServiceImpl(Map<String, Maze> games) {
        this.games = games;
    }

    public Maze addGame(String uri, Point[][] map, String sessionId, int row, int col, String username) {
        Maze maze = new Maze(map);
        maze.setMeta(new Point(row, col, false));
        maze.addPlayer(new Player(sessionId, username, new Point(0, 0, false)));
        games.put(uri, maze);
        return maze;
    }

    public Maze getByURI(String uri) {
        return games.get(uri);
    }

    public Maze joinGame(String uri, String sessionId, String username) {
        Maze maze = games.get(uri);
        if (maze != null) {
            maze.addPlayer(new Player(sessionId, username, new Point(0, 0, false)));
        }

        return maze;
    }


    public Set<? extends Player> getPlayersByGame(String uri) {
        Maze maze = games.get(uri);
        if (maze != null) {
            return maze.getPlayers();
        }

        return null;
    }

    public Maze makeMove(String uri, String sessionId, int move) {
        Maze maze = games.get(uri);

        if (maze != null) {
            Player player = maze.getPlayers()
                    .stream()
                    .filter(e -> Objects.equals(sessionId, e.getSessionId()))
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Not found"));
            Point[][] points = maze.getPoints();
            Point playerPoint = player.getPoint();
            switch (move) {
                case 1:
                    if (playerPoint.getRow() > 0 && points[playerPoint.getRow() - 1][playerPoint.getCol()].isOccupied())
                        player.getPoint().setRow(player.getPoint().getRow() - 1);
                    break;
                case 2:
                    if (playerPoint.getRow() < 28 && points[playerPoint.getRow() + 1][playerPoint.getCol()].isOccupied())
                        player.getPoint().setRow(player.getPoint().getRow() + 1);
                    break;
                case 3:
                    if (playerPoint.getCol() > 0 && points[playerPoint.getRow()][playerPoint.getCol() - 1].isOccupied())
                        player.getPoint().setCol(player.getPoint().getCol() - 1);
                    break;
                case 4:
                    if (playerPoint.getCol() < 28 && points[playerPoint.getRow()][playerPoint.getCol() + 1].isOccupied())
                        player.getPoint().setCol(player.getPoint().getCol() + 1);
                    break;
            }

            if (playerPoint.getCol() == maze.getMeta().getCol() && playerPoint.getRow() == maze.getMeta().getRow()) {
                maze.setWinner(player);
            }
        }
        return maze;
    }

    public void removePlayer(String sessionId) {
        this.games.forEach((k, v) -> v.getPlayers().removeIf(e -> Objects.equals(sessionId, e.getSessionId())));
    }

    public Set<Maze> getGamesByPlayer(String sessionId) {
        return this.games
                .values()
                .stream()
                .filter(e -> e.getPlayers()
                        .stream()
                        .anyMatch(f -> Objects.equals(sessionId, f.getSessionId())))
                .collect(Collectors.toSet());
    }

    public Map<String, ? extends Maze> getGames() {
        return this.games;
    }

    @Scheduled(fixedRate = Constants.REMOVE_INACTIVE_GAMES_RATE)
    public void removeInactiveGames() {
        this.getGames()
                .values()
                .removeIf(e -> e.getPlayers().isEmpty());
    }

}
