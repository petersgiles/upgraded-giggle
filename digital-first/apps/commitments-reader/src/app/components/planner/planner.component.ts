import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core'
import * as createjs from 'createjs-module'
import * as plannerData from './planner.data.json'
import * as plannerConfig from './planner.config.json'

@Component({
  selector: 'digital-first-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements AfterViewInit {
  @ViewChild('timelineCanvas') timelineCanvas: ElementRef
  ngAfterViewInit(): void {
    this.renderEverything()
  }

  renderExample() {
    var stage = new createjs.Stage('timelineCanvas')
    var circle = new createjs.Shape()
    circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50)
    circle.x = 10
    circle.y = 10
    stage.addChild(circle)

    stage.update()

    createjs.Tween.get(circle, { loop: true })
      .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
      .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
      .to({ alpha: 0, y: 225 }, 100)
      .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
      .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2))

    createjs.Ticker.setFPS(60)
    createjs.Ticker.addEventListener('tick', stage)
  }

  renderEverything() {
    initStage()
    setCanvasHeight()
    var timeStart,
      timeEnd,
      timeLabels,
      timeDiff,
      numberOfMonths,
      numberOfYears,
      selected

    function initConfig() {
      return plannerConfig
    }

    var data = plannerData

    var detailToggle = { checked: false }
    var detail = 'Select an event for more detail'
    var eventTitle = 'Event Detail'

    var busy = false

    var eventTypes = {}

    function bindTextOnClick(textObject, hitMargin, parentShape, fn) {
      var hit = new createjs.Shape()
      var bounds = textObject.getTransformedBounds()
      var heightMargin = (hitMargin - bounds.height) / 2
      hit.graphics
        .beginFill('#000000')
        .drawRect(
          0,
          0 - heightMargin,
          bounds.width,
          bounds.height + heightMargin
        )

      textObject.hitArea = hit
      textObject.hitArea.cursor = textObject.cursor = 'pointer'

      textObject.on('click', function() {
        fn()
      })

      parentShape.graphics
        .setStrokeStyle(1)
        .setStrokeDash([2, 2], 0)
        .beginStroke('#fffffff')
        .moveTo(bounds.x, bounds.y + bounds.height)
        .lineTo(bounds.x + bounds.width + 8, bounds.y + bounds.height)
        .endStroke()
    }

    var stage, canvas, bg, mg, sfg, fg, bgText, fgText, shapes
    function initStage() {
      if (stage) {
        stage.removeAllChildren()
        stage.update()
      }
      stage = new createjs.Stage('timelineCanvas')
      stage.enableMouseOver()
      canvas = stage.canvas
      bg = new createjs.Shape()
      mg = new createjs.Shape()
      sfg = new createjs.Shape()
      fg = new createjs.Shape()
      bgText = []
      fgText = []
      shapes = []
    }

    var linePadding = 3

    var canvasHeight,
      canvasWidth,
      yLabelWidth,
      yearOffset,
      yearLabelHeight,
      minLineHeight,
      monthWidth,
      timeWidth,
      barHeight,
      barFontSize,
      subLineHeight,
      keyPrioritiesBarWidth,
      keyWidth,
      keyX,
      lineScale,
      streamPadding
    function setCanvasHeight() {
      lineScale = 2.2

      yearLabelHeight = 100
      canvasHeight = yearLabelHeight
      canvasWidth = this.timelineCanvas.width()
      yLabelWidth = 270
      yearOffset = yLabelWidth + 1
      barHeight = 16 * lineScale
      barFontSize = 6 * lineScale
      minLineHeight = (barHeight + linePadding) * 2
      subLineHeight = barHeight + 3 * lineScale
      keyWidth = 0
      keyX = canvasWidth - keyWidth
      timeWidth = canvasWidth - yLabelWidth - keyWidth
      monthWidth = timeWidth / numberOfMonths
      keyPrioritiesBarWidth = 20
      streamPadding = 3 * lineScale
    }

    function tick(event) {
      if (stage) {
        stage.update()
      }
    }

    function resize() {
      initStage()
      setCanvasHeight()
      //TODO: update items instead of nuking the whole thing?
      drawChart()
    }

    //TODO: use window.devicePixelRatio instead of arbitrary * 2
    function oversample() {
      this.timelineCanvas.height(canvasHeight)
      //oversample for better, crisper resolution!
      var oversample = 2
      canvas.height = canvasHeight * oversample
      canvas.width = canvasWidth * oversample
      stage.scaleX = oversample
      stage.scaleY = oversample
    }

    function drawYear(fill, label, labelFill, firstMonth, lastMonth) {
      var firstMonth = typeof firstMonth !== 'undefined' ? firstMonth : 0
      var lastMonth = typeof lastMonth !== 'undefined' ? lastMonth : 11

      var months = lastMonth - firstMonth + 1
      var yearWidth = months * monthWidth

      //header
      bg.graphics
        .setStrokeStyle(6)
        .beginStroke(labelFill)
        .beginFill(labelFill)
        .drawRect(yearOffset, 0, yearWidth, yearLabelHeight)
        .beginStroke('#eaeaea')
        .moveTo(yearOffset, yearLabelHeight / 2)
        .lineTo(yearOffset + yearWidth, yearLabelHeight / 2)
        .endStroke()

      //header label
      var labelText = new createjs.Text(label, '22px Montserrat', '#525252')
      labelText.x = yearOffset - 15
      labelText.y = yearLabelHeight * 0.25
      labelText.textAlign = 'left'
      labelText.textBaseline = 'middle'
      bgText.push(labelText)

      //TODO: create object array of config
      //months
      var monthOffset = yearOffset
      for (var i = firstMonth; i <= lastMonth; i++) {
        var monthColour = 'rgba(225,225,255,0.5)'
        var monthLabel = ''
        var monthLabelColour = '#000'
        var monthFont = '14px Montserrat'
        var monthLabelX = monthOffset
        var monthLabelY = yearLabelHeight * 0.75
        var monthLabelRotation = 0
        var monthTextAlign = 'center'
        var monthBaseline = 'middle'
        switch (i) {
          case 0: // Jan
            monthLabel = 'Jan'
            monthTextAlign = 'center'
            break
          case 1:
            monthLabel = 'Add. Estimates'
            monthColour = 'rgba(250,250,250,0.5)'
            monthFont = 'bold 14px Arial'
            monthLabelColour = '#bbb'
            monthLabelRotation = 90
            monthLabelX += monthWidth / 2
            monthLabelY = (canvasHeight - yearLabelHeight) * 0.7
            break
          case 9:
            monthLabel = 'Supp. Estimates'
            monthColour = 'rgba(255,255,255,0.25)'
            monthLabelColour = '#bbb'
            monthFont = 'bold 14px Arial'
            monthLabelRotation = 90
            monthLabelX += monthWidth / 2
            monthLabelY = (canvasHeight - yearLabelHeight) * 0.7
            break
          case 10: // Myefo
            monthLabel = 'MYEFO'
            monthColour = 'rgba(250,250,250,0.5)'
            monthFont = 'bold 14px Arial'
            monthLabelColour = '#bbb'
            monthLabelRotation = 90
            monthLabelX += monthWidth / 2
            monthLabelY = (canvasHeight - yearLabelHeight) * 0.7
            break
          case 4: // Budget
            monthLabel = 'Budget'
            monthColour = 'rgba(255,255,255,0.25)'
            monthFont = 'bold 14px Arial'
            monthLabelColour = '#bbb'
            monthLabelRotation = 90
            monthLabelX += monthWidth / 2
            monthLabelY = (canvasHeight - yearLabelHeight) * 0.7
            break
          case 6: // July
            monthLabel = 'Jul'
            monthTextAlign = 'center'
            break
          default:
            break
        }
        bg.graphics
          .setStrokeStyle(2)
          .beginStroke('rgba(255,255,255,0.5)')
          .beginFill(monthColour)
          .drawRect(
            monthOffset,
            yearLabelHeight + 1,
            monthWidth,
            canvasHeight - yearLabelHeight
          )

        if (monthLabel) {
          var monthText = new createjs.Text(
            monthLabel,
            monthFont,
            monthLabelColour
          )
          monthText.rotation = monthLabelRotation
          monthText.x = monthLabelX
          monthText.y = monthLabelY
          monthText.textAlign = monthTextAlign
          monthText.textBaseline = monthBaseline
          bgText.push(monthText)
        }

        // EOY and EOFY dividers
        switch (i) {
          case 0: // Jan
          case 6: // July
            drawDivider(monthOffset)
            // Draw circles above Months
            bg.graphics
              .beginStroke('#bbb')
              .beginFill('#bbb')
              .drawCircle(monthOffset, monthText.y - 25, 8)
            break
        }

        if (i == lastMonth) {
          // round off chart
          drawDivider(monthOffset + monthWidth)
        }

        monthOffset += monthWidth
      }

      yearOffset += yearWidth
    }

    function drawDivider(x) {
      bg.graphics
        .setStrokeStyle(2)
        .beginStroke('rgba(150,200,200,0.5)')
        .moveTo(x, yearLabelHeight)
        .lineTo(x, canvasHeight)
        .endStroke()
    }

    function drawXAxis() {
      var icon = ''
      var yLabelText = ''
      var yLabelHeader = new createjs.Text(
        yLabelText,
        'bold 22px Montserrat',
        '#3a99a7'
      )
      yLabelHeader.x = 10
      yLabelHeader.y = 10
      yLabelHeader.lineWidth = yLabelWidth - yLabelHeader.x
      fgText.push(yLabelHeader)

      // Sort by topicOrder
      data.sort(function(a, b) {
        return a.topicOrder - b.topicOrder
      })

      var offset = yearLabelHeight
      var isKeyPrioritiesDrawn = false
      data.forEach(function(topic, index) {
        var iconPath = topic.topicIcon

        var icon: any = new createjs.Bitmap(iconPath)

        var title = topic.topicTitle
        var drawnHeight = drawData(topic.items, offset)
        var lineHeight =
          drawnHeight > minLineHeight ? drawnHeight : minLineHeight
        var lineY = offset + lineHeight

        // key priorities bar
        if (!isKeyPrioritiesDrawn && !topic.keyPriority) {
          if (index == 0) {
            isKeyPrioritiesDrawn = true
          } else {
            var keyPrioritiesBarHeight = offset - yearLabelHeight
            fg.graphics
              .setStrokeStyle(2)
              .beginStroke('rgba(179,224,224,0.75)')
              .beginFill('rgba(179,224,224,0.75)')
              .drawRect(
                0,
                yearLabelHeight,
                keyPrioritiesBarWidth,
                keyPrioritiesBarHeight
              )
            var keyPrioritiesText = new createjs.Text(
              'Key reform priorities',
              'Bold 16px Montserrat',
              '#525252'
            )
            keyPrioritiesText.x = keyPrioritiesBarWidth / 2
            keyPrioritiesText.y = yearLabelHeight + keyPrioritiesBarHeight / 2
            keyPrioritiesText.rotation = -90
            keyPrioritiesText.textAlign = 'center'
            keyPrioritiesText.textBaseline = 'middle'
            fgText.push(keyPrioritiesText)

            isKeyPrioritiesDrawn = true
          }
        }

        // x-axis lines
        mg.graphics
          .setStrokeStyle(1)
          //.beginStroke('#b3b3b3')
          .beginStroke('rgba(150,200,200,0.3)')
          .moveTo(0, lineY)
          .lineTo(canvasWidth - keyWidth, lineY)
          .endStroke()

        // labels
        var fontSize = barFontSize * 1.2
        var labelText = new createjs.Text(
          title,
          fontSize + 'px Montserrat',
          '#525252'
        )
        labelText.textAlign = 'left' //"right";
        labelText.textBaseline = 'middle'
        labelText.x = 60 //yLabelWidth - 20;
        labelText.lineWidth = yLabelWidth - 30
        var bounds = labelText.getBounds()
        // labelText.hitArea = bounds;
        labelText.y =
          offset +
          lineHeight / 2 -
          (bounds.height / fontSize - 1) * fontSize * 0.5 //Adjusting for multi-line text

        // Topic Icon
        icon.width = icon.height = 24
        icon.scaleX = icon.scaleY = 1.0
        icon.x = labelText.x - icon.width * 2
        icon.y = labelText.y - 20
        icon.alpha = 0.3

        bindTextOnClick(labelText, lineHeight, mg, toggleDetail)

        fgText.push(labelText, icon)

        offset += lineHeight
        canvasHeight += lineHeight
      })
    }

    function drawData(data, offset) {
      offset += streamPadding
      var maxLineHeight = 0

      var sortedRows = data.sort(function(a, b) {
        return a.stream - b.stream == 0
          ? a.startDate - b.startDate
          : a.stream - b.stream
      })

      var detailIndex = 0
      var streamOffset = 0
      var streamCount = 0
      var previousRows = []
      sortedRows
        .filter(function(row) {
          var start = row.startDate
          var end = row.endDate
          var show =
            row.displayIn == 'Both' ||
            row.displayIn == null ||
            (detailToggle.checked && row.displayIn == 'Detail') ||
            (!detailToggle.checked && row.displayIn == 'Overview')
          // draw things appropraite to the current details setting
          return show && start <= timeEnd && end >= timeStart // don't draw things that start before the end or end before the start
        })
        .forEach(function(row, i) {
          var id = id
          var label = row.title
          var start = row.startDate
          var end = row.endDate
          var eventType = row.eventType
          var colour = row.colour
          var shape = row.shape
          var positionOverride = row.positionOverride
          var textPositionOverride = row.textPositionOverride
          var stream = row.stream
          var displayIn = row.displayIn
          var detail = row.detail

          var lineStart = getDateX(start)
          var lineEnd = getDateX(end)
          lineEnd = lineEnd > keyX ? keyX : lineEnd
          var lineLength = lineEnd - lineStart

          if (previousRows.length) {
            var previousRow = previousRows[previousRows.length - 1]
          }

          if (previousRow && previousRow.stream != stream) {
            streamOffset +=
              Math.max.apply(
                null,
                previousRows.map(function(row) {
                  return row.subLineIndex
                })
              ) + 1
            previousRows = []
            detailIndex = 0

            if (detailToggle.checked) {
              offset += streamPadding * 2
              streamCount++
            }
          }

          var subLineIndex = 0
          if (positionOverride) {
            subLineIndex = positionOverride - 1
          } else {
            // ascertain subline index
            var collisionLineIndices = []
            if (label) {
              var isPointInTime =
                ['Cabinet submission', 'Key date', 'State election'].indexOf(
                  eventType
                ) > -1
              var collisions = previousRows.filter(function(row) {
                if (row.label && row.label.length) {
                  return false
                }
                var rowIsLine =
                  [
                    'Policy process',
                    'Legislation process',
                    'Implementation'
                  ].indexOf(row.eventType) > -1
                var textCollision =
                  lineStart <= row.rightTextBound + 3 * lineScale
                var lineCollision = start <= row.end
                return isPointInTime && rowIsLine
                  ? textCollision
                  : textCollision || lineCollision
              })
              collisionLineIndices = collisions.map(function(item) {
                return item.subLineIndex
              })
            }
            if (!collisionLineIndices.length) {
              collisionLineIndices.push(-1)
            }

            collisionLineIndices.sort(function(a, b) {
              return a - b
            })

            if (detailToggle.checked) {
              subLineIndex = detailIndex
            } else {
              var previousIndex = -1
              var maxIndex = Math.max.apply(null, collisionLineIndices)
              for (
                i = 0;
                i <= maxIndex || i < collisionLineIndices.length;
                i++
              ) {
                var index = collisionLineIndices[i]
                var expectedSequence = previousIndex + 1
                if (index > expectedSequence) {
                  // found a hole in the sequence
                  subLineIndex = expectedSequence
                  break
                }
                previousIndex = index
              }

              if (previousIndex == maxIndex) {
                // If no holes, next index in sequence
                subLineIndex = maxIndex + 1
              }
            }
          }

          var subLineOffset = (subLineIndex + streamOffset) * subLineHeight
          var lineY = offset + subLineOffset + barHeight / 2

          var shape: any = drawItem.event(
            eventType,
            shape,
            colour,
            lineStart,
            lineY,
            lineLength
          )

          if (detail) {
            shape.cursor = 'pointer'
            shape.on('click', function(event) {
              handleSelect(bounds, shape, text, detail, label)
            })
          }
          shapes.push(shape)

          if (
            detailToggle.checked &&
            previousRow &&
            previousRow.stream == stream
          ) {
            sfg.graphics
              .setStrokeStyle(2)
              .beginStroke('rgba(150,200,200,0.5)')
              .moveTo(previousRow.lineStart + 3, previousRow.lineY)
              .lineTo(previousRow.lineStart + 3, lineY)
              .lineTo(lineStart + 3, lineY)
              .endStroke()
          }

          if (label) {
            // TODO: chuck into an object, index by textPositionOverride
            // Text
            var text = new createjs.Text(
              label,
              barFontSize + 'px Arial',
              '#000000'
            )
            text.x = lineStart + 5
            text.y = lineY
            text.textBaseline = 'middle'
            switch (textPositionOverride) {
              case 'Above':
                text.y -= 6
                text.textAlign = 'center'
                text.textBaseline = 'bottom'
                break
              case 'Below':
                text.y += 6
                text.textAlign = 'center'
                text.textBaseline = 'top'
                break
              case 'Left':
                text.x -= 5
                text.textAlign = 'right'
                break
              case 'Right':
              default:
                text.x += 10
                break
            }

            if (detail) {
              var bounds = text.getTransformedBounds()
              var itemClick = function() {
                handleSelect(bounds, shape, text, detail, label)
              }

              bindTextOnClick(text, subLineHeight, fg, itemClick)
            }
            fgText.push(text)
          }

          // push row details to array for collision detection in subsequent iterations
          var rightTextBound =
            text &&
            ['Above', 'Below', 'Left'].indexOf(textPositionOverride) == -1
              ? text.x + text.getBounds().width
              : 0
          previousRows.push({
            stream: stream,
            lineStart: lineStart,
            lineY: lineY,
            end: end,
            rightTextBound: rightTextBound,
            eventType: eventType,
            subLineIndex: subLineIndex
          })

          // get max line height to return to calling function
          var height =
            subLineOffset +
            subLineHeight +
            (streamCount + 1) * streamPadding * 2
          maxLineHeight = height > maxLineHeight ? height : maxLineHeight
          detailIndex++
        })

      return maxLineHeight
    }

    var handleSelect = function(bounds, shape, text, detail, label) {
      busy = true

      unselect()
      setTimeout(function() {
        detail = detail
        eventTitle = label
        selected = { shape: shape, text: text }
        busy = false
      })
      var highlightSelect = new createjs.Shape()
      highlightSelect.graphics
        .beginFill('rgba(179,224,224,0.2)')
        .drawRect(text.x, text.y - 25, bounds.width, bounds.height * 3.8)

      text.font = 'bold ' + text.font
      text.color = 'darkred'
    }

    var unselect = function() {
      if (selected) {
        selected.shape.shadow = null

        selected.text.font = selected.text.font.replace('bold ', '')
        selected.text.color = selected.text.color.replace('darkred', '#000')
      }
    }

    var drawItem = (function() {
      function line(colour, x, y, length) {
        return new createjs.Graphics()
          .setStrokeStyle(colour)
          .setStrokeStyle(barHeight, 'round', 'round')
          .beginStroke(colour)
          .moveTo(x, y)
          .lineTo(x + length, y)
          .endStroke()
      }

      function circle(colour, x, y) {
        var radius = 3.5 * lineScale
        return new createjs.Graphics()
          .setStrokeStyle(1)
          .beginStroke(colour)
          .beginFill(colour)
          .drawCircle(x, y, radius)
      }

      function triangle(colour, x, y) {
        var triangleY = y + barHeight / 5

        return new createjs.Graphics()
          .setStrokeStyle(3, 'round', 'round')
          .beginStroke(colour)
          .beginFill('transparent')
          .moveTo(x, triangleY)
          .lineTo(x + 3 * lineScale, triangleY - 6 * lineScale)
          .lineTo(x + 6 * lineScale, triangleY)
          .closePath()
      }

      function mapMarker(colour, x, y) {
        var triangleY = y + barHeight / 4 - 3 * lineScale

        var circle = new createjs.Graphics.Circle(x + 6.5, y, 7)

        return new createjs.Graphics()
          .setStrokeStyle(3, 'round', 'round')
          .beginStroke(colour)
          .beginFill(colour)
          .moveTo(x, triangleY)
          .append(circle)
          .lineTo(x + 6 * lineScale, triangleY)
          .lineTo(x + 3 * lineScale, triangleY + 12)
          .closePath()
      }

      function event(title, shape, colour, x, y, length) {
        if (shape === null || colour === null) {
          return
        }

        eventTypes[title] = { title: title, shape: shape, colour: colour }
        var graphics, layer
        switch (shape.toLowerCase()) {
          case 'line':
            graphics = line(colour, x, y, length)
            layer = mg
            break
          case 'triangle':
            graphics = triangle(colour, x, y)
            layer = fg
            break
          case 'mapmarker':
            graphics = mapMarker(colour, x, y)
            layer = fg
            break
          case 'circle':
            graphics = circle(colour, x, y)
            layer = fg
            break
          default:
            break
        }

        return new createjs.Shape(graphics)
      }

      return {
        event: event
      }
    })()

    // Ascertain the x co-ordinate of a given date
    // Get ratio of date vs timeStart and apply to timeWidth, then offset by the yLabelWidth
    function getDateX(date) {
      var diff = date - timeStart // If the diff is negative, treat as 0
      return (diff / timeDiff) * timeWidth + yLabelWidth
    }

    function drawChaser() {
      // Get ratio of today vs timescale and apply to time width
      var today = new Date()
      if (today < timeStart) {
        return
      }

      var todayX = getDateX(today)
      var width = todayX - yLabelWidth
      bg.graphics
        .setStrokeStyle(1)
        .beginStroke('#fff')
        .beginFill('rgba(215,215,215,0.25)')
        .drawRect(
          yLabelWidth,
          yearLabelHeight + 1,
          width,
          canvasHeight - yearLabelHeight
        )
      var months = Math.floor(width / monthWidth)
      var monthOffset = yLabelWidth + monthWidth
      for (var i = 0; i < months; i++) {
        bg.graphics
          .beginStroke('#ffffff')
          .moveTo(monthOffset, yearLabelHeight)
          .lineTo(monthOffset, canvasHeight)
          .endStroke()
        monthOffset += monthWidth
      }
    }

    function drawKey() {
      var x = canvasWidth - keyWidth + 10
      var height = barHeight + 3
      var length = 10

      var keyText = new createjs.Text('KEY', 'Bold 16px Arial', '#525252')
      keyText.x = x
      keyText.y = yearLabelHeight
      fgText.push(keyText)

      var offsetY = yearLabelHeight + height * 2
      for (var index in eventTypes) {
        var eventType = eventTypes[index]
        var shape = drawItem.event(
          eventType.title,
          eventType.shape,
          eventType.colour,
          x,
          offsetY,
          length
        )
        shapes.push(shape)
        var text = new createjs.Text(
          eventType.title,
          barFontSize + 'px Arial',
          '#525252'
        )
        text.x = x + 15
        text.y = offsetY
        text.textBaseline = 'middle'
        fgText.push(text)

        offsetY += height
      }
    }

    var yearColourCombos = [
      /*{fill: '#E7F2F4', labelFill: '#86BFC8'},
      {fill: '#D7EDF0', labelFill: '#409CA9'},
      {fill: '#E7F2F4', labelFill: '#017A8D'},
      {fill: '#D7EDF0', labelFill: '#015C6A'}*/
      { fill: '#E7F2F4', labelFill: '#fff' }
    ]

    function drawYears() {
      // yLabel background
      bg.graphics
        .setStrokeStyle(1)
        .beginStroke('#fff')
        .beginFill('#fff')
        .drawRect(0, 0, yLabelWidth, canvasHeight)
      var year = timeStart.year()
      for (var i = 0; i < numberOfYears; i++, year++) {
        var colourCombo = yearColourCombos[i % yearColourCombos.length]
        if (i == 0) {
          // first year
          drawYear(
            colourCombo.fill,
            year,
            colourCombo.labelFill,
            timeStart.month(),
            0
          )
        } else if (i == numberOfYears - 1) {
          // last year
          drawYear(
            colourCombo.fill,
            year,
            colourCombo.labelFill,
            0,
            timeEnd.month()
          )
        } else {
          // all other years
          drawYear(colourCombo.fill, year, colourCombo.labelFill, 0, 0)
        }
      }
    }

    function drawTimeLabels() {
      var labelY = yearLabelHeight * 0.75
      timeLabels.forEach(function(timeLabel) {
        var labelX = timeLabel.date.toString()
        var text = new createjs.Text(timeLabel.label, '10px Arial', '#ffffff')
        text.x = labelX
        text.y = labelY
        text.textAlign = 'center'
        text.textBaseline = 'middle'
        fgText.push(text)
      })
    }

    function drawChart() {
      drawXAxis()
      oversample()
      drawYears()
      drawChaser()
      //drawKey();
      drawTimeLabels()

      // add background
      stage.addChild(bg)
      bgText.forEach(function(item) {
        stage.addChild(item)
      })

      // add midground
      stage.addChild(mg)

      // add subforeground
      stage.addChild(sfg)

      //TODO: add lines to mg and other shapes to fg
      shapes.forEach(function(item, index) {
        stage.addChild(item)
      })

      // add foreground
      stage.addChild(fg)
      fgText.forEach(function(item, index) {
        stage.addChild(item)
      })

      // render the stage onto the canvas
      stage.update()
      // This is so the images get rendered
      setTimeout(function() {
        stage.update()
      }, 100)
    }

    var toggleDetail = function() {
      detailToggle.checked = !detailToggle.checked
      resize()
    }

    initStage()
    setCanvasHeight()
  }
}
