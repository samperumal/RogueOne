import { gameState, initialise, processInput,tileAt } from "../scripts/game.js";
import { parseMap } from "../scripts/map.js";

const chamber = [
`
#####
#...#
#######
#.@+..#
##+####
#...#
#####`,
{
    "+": [
        { "x": 2, "y": 5, "open": false},
        { "x": 3, "y": 4, "open": true },
    ]
}
];

describe("Test chamber 2 - Visibility:",()=>{
    beforeEach(done=>
    {
        initialise(Promise.resolve(
            parseMap(chamber[0],chamber[1])))
        .then(done)
    });

    it("player starts at (2,4)",()=>
            expect([gameState.player.x, gameState.player.y]).toEqual([2,4])
    )

    it('A tile in the same room as player is visible', ()=>
            expect(tileAt(1,4).isVisible ).toBe(true)
    );

    it("Tiles in another room are not visible",()=>
            expect(tileAt(2,2).isVisible).toBe(false)
    )

    it("Corridor walls are visible all the way down the corridor",()=>
            expect(tileAt(5,3).isVisible).toBe(true)
    );

    it("Room corner tiles are visible when in the room",()=>
            expect(tileAt(6,3).isVisible).toBe(true)
    );

    // What's wrong with my door? :(
    it("Cannot see through a closed door",()=>
            expect(tileAt(2,6).isVisible).toBe(false)
    );

    it("Can see through an open door",()=>
    {
            processInput("ArrowDown");
            expect(tileAt(3,4).isVisible).toBe(true)
    }
    );

});