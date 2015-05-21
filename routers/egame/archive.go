// Copyright 2013 Beego Samples authors
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

package egame

import (
	"container/list"
)

type EventType int

const (
	EVENT_JOIN = iota
	EVENT_LEAVE
	EVENT_MESSAGE
	EVENT_PRICE
	EVENT_GAME
	EVENT_ALREADY_ONLINE
	EVENT_SYSTEM
	EVENT_PRIVATE
)

type Event struct {
	//Id        int
	Type      EventType // JOIN, LEAVE, MESSAGE
	Cmd       string
	Uid       string
	Timestamp int    // Unix timestamp (secs)
	Lucky     string // Unix timestamp (secs)
	Content   string
	//Delay int       // ms
}

type Martketprice struct {
	Id float64
	S  string  //Symbol
	P  float64 //Last_Trade_Price_Only
	C  float64 //Change
	R  string  // Change Rate
}

type Game struct {
	Type      EventType // JOIN, LEAVE, MESSAGE
	User      string
	Timestamp int // Unix timestamp (secs)
	Content   string
	Cmd       string
	Id        float64
	Name      string //
	Coin      string
	Amount    float64
	Hash      string //
	Seed      string //
	Result    string //
}

const archiveSize = 50

// Event archives.
var archive = list.New()

// NewArchive saves new event to archive list.
func NewArchive(event Event) {
	if archive.Len() >= archiveSize {
		archive.Remove(archive.Front())
	}
	archive.PushBack(event)
}

// GetEvents returns all events after lastReceived.
func GetEvents(lastReceived int) []Event {
	events := make([]Event, 0, archive.Len())
	for event := archive.Front(); event != nil; event = event.Next() {
		e := event.Value.(Event)
		if e.Timestamp > int(lastReceived) {
			events = append(events, e)
		}
	}
	return events
}

func GetEventsByUser(lastReceived int, user string) []Event {
	events := make([]Event, 0, archive.Len())
	for event := archive.Front(); event != nil; event = event.Next() {
		e := event.Value.(Event)
		if e.Timestamp > int(lastReceived) {
			if e.Uid == user {
				events = append(events, e)
			}
		}
	}
	return events
}
