import React, { useEffect, useRef, useState } from 'react';
import { getDirectorNetwork } from '@/services/directorService';
import { Loader2, ZoomIn, ZoomOut, MaximizeIcon, MinimizeIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DirectorGraphProps {
  companyId: number;
}

const DirectorGraph: React.FC<DirectorGraphProps> = ({ companyId }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [network, setNetwork] = React.useState<any>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [selectedDirector, setSelectedDirector] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pixelRatio, setPixelRatio] = useState(1);
  const [autoFitDone, setAutoFitDone] = useState(false);
  
  const nodePositions = useRef<any>({});
  const nodeSizes = useRef<any>({});

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio || 1);
  }, []);

  useEffect(() => {
    const fetchDirectorData = async () => {
      try {
        const data = await getDirectorNetwork(companyId);
        setNetwork(data);
      } catch (error) {
        console.error('Error fetching director network:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectorData();
  }, [companyId]);

  useEffect(() => {
    if (!network || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        
        canvas.width = rect.width * pixelRatio;
        canvas.height = rect.height * pixelRatio;
        
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        ctx.scale(pixelRatio, pixelRatio);
        
        if (!autoFitDone) {
          setAutoFitDone(true);
          setTimeout(() => {
            autoFitGraph();
          }, 100);
        } else {
          drawNetwork();
        }
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function calculateGraphBounds() {
      if (!network || !network.directors || network.directors.length === 0) {
        return { minX: 0, maxX: 0, minY: 0, maxY: 0, width: 0, height: 0 };
      }
      
      const canvasWidth = canvas.width / pixelRatio;
      const canvasHeight = canvas.height / pixelRatio;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      
      const directorRadius = 60;
      const relatedCompanyRadius = 35;
      const mainCompanyRadius = 80;
      const directorDistance = Math.min(canvasWidth, canvasHeight) * 0.25;
      const companyDistance = directorRadius * 2.5;
      
      let minX = centerX;
      let maxX = centerX;
      let minY = centerY;
      let maxY = centerY;
      
      minX = Math.min(minX, centerX - mainCompanyRadius);
      maxX = Math.max(maxX, centerX + mainCompanyRadius);
      minY = Math.min(minY, centerY - mainCompanyRadius/2);
      maxY = Math.max(maxY, centerY + mainCompanyRadius/2);
      
      const numDirectors = network.directors.length;
      network.directors.forEach((director: any, index: number) => {
        const angle = (index / numDirectors) * Math.PI * 2;
        const dirX = centerX + Math.cos(angle) * directorDistance;
        const dirY = centerY + Math.sin(angle) * directorDistance;
        
        minX = Math.min(minX, dirX - directorRadius * 1.25);
        maxX = Math.max(maxX, dirX + directorRadius * 1.25);
        minY = Math.min(minY, dirY - directorRadius * 0.75);
        maxY = Math.max(maxY, dirY + directorRadius * 0.75);
        
        if (director.otherCompanies && director.otherCompanies.length > 0) {
          director.otherCompanies.forEach((company: any, companyIndex: number) => {
            const maxSpread = Math.PI / 2;
            const totalSpread = Math.min(maxSpread, (director.otherCompanies.length - 1) * Math.PI / 6);
            const baseAngle = angle - totalSpread / 2;
            const companyAngle = baseAngle + companyIndex * (totalSpread / Math.max(1, director.otherCompanies.length - 1));
            
            const compX = dirX + Math.cos(companyAngle) * companyDistance;
            const compY = dirY + Math.sin(companyAngle) * companyDistance;
            
            minX = Math.min(minX, compX - relatedCompanyRadius * 1.25);
            maxX = Math.max(maxX, compX + relatedCompanyRadius * 1.25);
            minY = Math.min(minY, compY - relatedCompanyRadius * 1.2);
            maxY = Math.max(maxY, compY + relatedCompanyRadius * 1.2);
          });
        }
      });
      
      return { 
        minX, 
        maxX, 
        minY, 
        maxY, 
        width: maxX - minX, 
        height: maxY - minY 
      };
    }
    
    function autoFitGraph() {
      const bounds = calculateGraphBounds();
      
      const padding = 40;
      const canvasWidth = canvas.width / pixelRatio;
      const canvasHeight = canvas.height / pixelRatio;
      
      const scaleX = (canvasWidth - padding * 2) / bounds.width;
      const scaleY = (canvasHeight - padding * 2) / bounds.height;
      const newScale = Math.min(scaleX, scaleY, 1);
      
      const graphCenterX = (bounds.minX + bounds.maxX) / 2;
      const graphCenterY = (bounds.minY + bounds.maxY) / 2;
      
      const canvasCenterX = canvasWidth / 2;
      const canvasCenterY = canvasHeight / 2;
      
      const newTransformX = canvasCenterX - graphCenterX * newScale;
      const newTransformY = canvasCenterY - graphCenterY * newScale;
      
      setZoomLevel(newScale);
      setTransform({ 
        x: newTransformX, 
        y: newTransformY 
      });
      
      drawNetwork();
    }

    function drawNetwork() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      
      ctx.save();
      
      ctx.translate(transform.x, transform.y);
      ctx.scale(zoomLevel, zoomLevel);
      
      const canvasWidth = canvas.width / pixelRatio;
      const canvasHeight = canvas.height / pixelRatio;
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const directorRadius = 60;
      const relatedCompanyRadius = 35;
      const directorDistance = Math.min(canvasWidth, canvasHeight) * 0.25 / zoomLevel;
      
      drawCompanyNode(centerX, centerY, 80);
      
      const numDirectors = network.directors.length;
      network.directors.forEach((director: any, index: number) => {
        const angle = (index / numDirectors) * Math.PI * 2;
        const dirX = centerX + Math.cos(angle) * directorDistance;
        const dirY = centerY + Math.sin(angle) * directorDistance;
        
        const directorId = `director-${director.name}`;
        nodePositions.current[directorId] = { x: dirX, y: dirY };
        nodeSizes.current[directorId] = directorRadius;
        
        const isDirectorSelected = selectedDirector === director.name;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(dirX, dirY);
        ctx.strokeStyle = isDirectorSelected ? '#8b5cf6' : '#d1d5db';
        ctx.lineWidth = isDirectorSelected ? 2 : 1;
        ctx.stroke();
        
        drawDirectorNode(dirX, dirY, directorRadius, director, isDirectorSelected);
        
        if (director.otherCompanies && director.otherCompanies.length > 0) {
          const companyAngleStep = Math.PI / 6;
          const companyRadius = relatedCompanyRadius;
          const companyDistance = directorRadius * 2.5;
          
          director.otherCompanies.forEach((company: any, companyIndex: number) => {
            const maxSpread = Math.PI / 2;
            const totalSpread = Math.min(maxSpread, (director.otherCompanies.length - 1) * companyAngleStep);
            const baseAngle = angle - totalSpread / 2;
            const companyAngle = baseAngle + companyIndex * (totalSpread / Math.max(1, director.otherCompanies.length - 1));
            
            const compX = dirX + Math.cos(companyAngle) * companyDistance;
            const compY = dirY + Math.sin(companyAngle) * companyDistance;
            
            const companyId = `company-${director.name}-${company.name}`;
            nodePositions.current[companyId] = { x: compX, y: compY };
            nodeSizes.current[companyId] = companyRadius;
            
            const isHighlighted = isDirectorSelected;
            ctx.beginPath();
            ctx.moveTo(dirX, dirY);
            ctx.lineTo(compX, compY);
            ctx.strokeStyle = isHighlighted ? '#8b5cf680' : '#d1d5db80';
            ctx.lineWidth = isHighlighted ? 1.5 : 0.8;
            ctx.stroke();
            
            drawRelatedCompanyNode(compX, compY, companyRadius, company, isHighlighted);
          });
        }
      });
      
      ctx.restore();
    }
    
    function drawCompanyNode(x: number, y: number, radius: number) {
      nodePositions.current['main-company'] = { x, y };
      nodeSizes.current['main-company'] = radius;
      
      const width = radius * 2;
      const height = radius;
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, height, 8);
      ctx.fillStyle = '#0a2540';
      ctx.fill();
      
      const companyName = network?.directors[0]?.otherCompanies[0]?.name || "Company";
      
      ctx.fillStyle = 'white';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const words = companyName.split(' ');
      let line = '';
      let lines = [];
      const maxWidth = width - 20;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > maxWidth) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      lines = lines.slice(0, 3);
      let yOffset = (lines.length - 1) * -10;
      
      lines.forEach((line, index) => {
        ctx.fillText(line.trim(), x, y + yOffset + index * 20);
      });
    }
    
    function drawDirectorNode(x: number, y: number, radius: number, director: any, isSelected: boolean) {
      const width = radius * 2.5;
      const height = radius;
      
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, height, 8);
      ctx.fillStyle = isSelected ? '#f0ecfe' : 'white';
      ctx.strokeStyle = isSelected ? '#8b5cf6' : '#d1d5db';
      ctx.lineWidth = isSelected ? 2 : 1;
      ctx.fill();
      ctx.stroke();
      
      const riskColor = getColorByScore(director.riskScore);
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, 4, [8, 8, 0, 0]);
      ctx.fillStyle = riskColor;
      ctx.fill();
      
      ctx.fillStyle = '#333';
      ctx.font = 'bold 13px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.fillText(director.name, x, y);
      
      const struckOffCount = director.otherCompanies.filter((c: any) => 
        c.name.toLowerCase().includes('struck-off')).length;
      
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#666';
      ctx.fillText(`${director.otherCompanies.length} companies`, x, y + height/2 + 15);
      
      if (struckOffCount > 0) {
        ctx.fillStyle = '#ef4444';
        ctx.fillText(`${struckOffCount} struck-off`, x, y + height/2 + 30);
      }
    }
    
    function drawRelatedCompanyNode(x: number, y: number, radius: number, company: any, isHighlighted: boolean) {
      const isStruckOff = company.name.toLowerCase().includes('struck-off');
      
      const width = radius * 2.5;
      const height = radius * 1.2;
      
      ctx.beginPath();
      ctx.roundRect(x - width/2, y - height/2, width, height, 6);
      ctx.fillStyle = isStruckOff ? '#fecaca' : (isHighlighted ? '#e0e7ff' : '#f3f4f6');
      ctx.strokeStyle = isStruckOff ? '#ef4444' : (isHighlighted ? '#8b5cf680' : '#d1d5db');
      ctx.lineWidth = isHighlighted ? 1.5 : 1;
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = isStruckOff ? '#b91c1c' : '#4b5563';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      let displayName = company.name;
      if (isStruckOff) {
        displayName = displayName.replace(/ \(Struck-off\)/gi, '');
      }
      
      const words = displayName.split(' ');
      let line = '';
      let lines = [];
      const maxWidth = width - 10;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        if (ctx.measureText(testLine).width > maxWidth) {
          lines.push(line);
          line = words[i] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      lines = lines.slice(0, 2);
      let yOffset = (lines.length - 1) * -6;
      
      lines.forEach((line, index) => {
        ctx.fillText(line.trim(), x, y - 5 + yOffset + index * 12);
      });
      
      const status = isStruckOff ? 'Struck-off' : 'Active';
      ctx.font = '8px Inter, sans-serif';
      ctx.fillText(status, x, y + height/2 - 5);
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left);
      const mouseY = (e.clientY - rect.top);
      
      const adjustedX = (mouseX - transform.x) / zoomLevel;
      const adjustedY = (mouseY - transform.y) / zoomLevel;
      
      let hoveredNodeInfo = null;
      
      for (const [id, position] of Object.entries(nodePositions.current)) {
        const { x, y } = position as { x: number, y: number };
        const radius = nodeSizes.current[id];
        
        let hit = false;
        
        if (id === 'main-company') {
          const width = radius * 2;
          const height = radius;
          hit = adjustedX >= x - width/2 && adjustedX <= x + width/2 &&
                adjustedY >= y - height/2 && adjustedY <= y + height/2;
        } else if (id.startsWith('director-')) {
          const width = radius * 2.5;
          const height = radius;
          hit = adjustedX >= x - width/2 && adjustedX <= x + width/2 &&
                adjustedY >= y - height/2 && adjustedY <= y + height/2;
        } else if (id.startsWith('company-')) {
          const width = radius * 2.5;
          const height = radius * 1.2;
          hit = adjustedX >= x - width/2 && adjustedX <= x + width/2 &&
                adjustedY >= y - height/2 && adjustedY <= y + height/2;
        }
        
        if (hit) {
          if (id === 'main-company') {
            hoveredNodeInfo = { type: 'company', data: network };
          } else if (id.startsWith('director-')) {
            const directorName = id.replace('director-', '');
            const director = network.directors.find((d: any) => d.name === directorName);
            if (director) {
              hoveredNodeInfo = { type: 'director', data: director };
            }
          } else if (id.startsWith('company-')) {
            const [, directorName, companyName] = id.split('-');
            const director = network.directors.find((d: any) => d.name === directorName);
            if (director) {
              const company = director.otherCompanies.find((c: any) => c.name === companyName);
              if (company) {
                hoveredNodeInfo = { type: 'relatedCompany', data: company, director };
              }
            }
          }
          break;
        }
      }
      
      setHoveredNode(hoveredNodeInfo);
      
      if (isDragging) {
        setTransform({
          x: transform.x + (e.clientX - dragStart.x),
          y: transform.y + (e.clientY - dragStart.y),
        });
        setDragStart({ x: e.clientX, y: e.clientY });
        drawNetwork();
      }
      
      canvas.style.cursor = hoveredNodeInfo ? 'pointer' : (isDragging ? 'grabbing' : 'grab');
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        canvas.style.cursor = 'grabbing';
      }
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        const wasDragging = isDragging;
        setIsDragging(false);
        canvas.style.cursor = 'grab';
        
        if (!wasDragging || (Math.abs(e.clientX - dragStart.x) + Math.abs(e.clientY - dragStart.y) < 5)) {
          const rect = canvas.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left);
          const mouseY = (e.clientY - rect.top);
          
          const adjustedX = (mouseX - transform.x) / zoomLevel;
          const adjustedY = (mouseY - transform.y) / zoomLevel;
          
          for (const [id, position] of Object.entries(nodePositions.current)) {
            if (!id.startsWith('director-')) continue;
            
            const { x, y } = position as { x: number, y: number };
            const radius = nodeSizes.current[id];
            
            const width = radius * 2.5;
            const height = radius;
            const hit = adjustedX >= x - width/2 && adjustedX <= x + width/2 &&
                  adjustedY >= y - height/2 && adjustedY <= y + height/2;
            
            if (hit) {
              const directorName = id.replace('director-', '');
              setSelectedDirector(prev => prev === directorName ? null : directorName);
              drawNetwork();
              break;
            }
          }
        }
      }
    };
    
    const handleMouseLeave = () => {
      setIsDragging(false);
      setHoveredNode(null);
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [network, zoomLevel, transform, isDragging, dragStart, selectedDirector, pixelRatio, autoFitDone]);

  const getColorByScore = (score: number) => {
    if (score >= 7) return '#10b981';
    if (score >= 4) return '#f59e0b';
    return '#ef4444';
  };

  const getRiskText = (score: number) => {
    if (score >= 7) return "Low risk";
    if (score >= 4) return "Moderate risk";
    return "High risk";
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev * 0.8, 0.5));
  };

  const handleResetView = () => {
    if (canvasRef.current && containerRef.current && network) {
      setAutoFitDone(false);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const renderTooltipContent = () => {
    if (!hoveredNode) return null;
    
    switch (hoveredNode.type) {
      case 'company':
        return (
          <div className="flex flex-col gap-1 p-1">
            <p className="font-bold text-sm">Main Company</p>
            <p className="text-xs text-muted-foreground">CIN: {network?.directors[0]?.otherCompanies[0]?.cin || "Unknown"}</p>
            <p className="text-xs text-muted-foreground">Status: Active</p>
          </div>
        );
        
      case 'director':
        const director = hoveredNode.data;
        const struckOffCount = director.otherCompanies.filter((c: any) => 
          c.name.toLowerCase().includes('struck-off')).length;
          
        return (
          <div className="flex flex-col gap-2 p-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm">{director.name}</p>
              <Badge className={`text-xs ${
                director.riskScore >= 7 ? "bg-green-100 text-green-800" : 
                director.riskScore >= 4 ? "bg-yellow-100 text-yellow-800" : 
                "bg-red-100 text-red-800"
              }`}>
                {getRiskText(director.riskScore)}
              </Badge>
            </div>
            
            <div className="text-xs">
              <p className="font-medium">Director Summary:</p>
              <p className="text-muted-foreground mt-1">
                Director {director.name} is associated with {director.otherCompanies.length} companies
                {struckOffCount > 0 ? `, of which ${struckOffCount} ${struckOffCount === 1 ? 'is' : 'are'} struck-off` : ''}.
              </p>
              
              {director.riskScore < 4 && (
                <p className="text-red-500 mt-1">Warning: This director has been previously disqualified</p>
              )}
              
              {director.riskScore >= 7 && struckOffCount === 0 && (
                <p className="text-green-600 mt-1">No red flags detected for this director</p>
              )}
            </div>
          </div>
        );
        
      case 'relatedCompany':
        const company = hoveredNode.data;
        const isStruckOff = company.name.toLowerCase().includes('struck-off');
        const cleanCompanyName = isStruckOff 
          ? company.name.replace(/ \(Struck-off\)/gi, '') 
          : company.name;
        
        return (
          <div className="flex flex-col gap-1 p-1">
            <p className="font-bold text-sm">{cleanCompanyName}</p>
            <p className="text-xs text-muted-foreground">CIN: {company.cin}</p>
            <p className={`text-xs ${isStruckOff ? "text-red-500 font-medium" : "text-green-600"}`}>
              Status: {isStruckOff ? "Struck-off" : "Active"}
            </p>
            <p className="text-xs text-muted-foreground">
              Director: {hoveredNode.director?.name}
            </p>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="h-full w-full relative flex items-center justify-center" ref={containerRef}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-grab"
        style={{ display: 'block' }}
      />
      
      <div className="absolute top-2 right-2 flex gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom In</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zoom Out</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={handleResetView}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset View</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                {isFullscreen ? (
                  <MinimizeIcon className="h-4 w-4" />
                ) : (
                  <MaximizeIcon className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-xs border shadow-sm">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Medium risk</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>High risk</span>
          </div>
        </div>
        <p className="text-gray-500 text-[10px] text-center">Click on directors to highlight connections</p>
      </div>
      
      {hoveredNode && (
        <HoverCard open>
          <HoverCardTrigger asChild>
            <div className="absolute inset-0 cursor-pointer opacity-0" />
          </HoverCardTrigger>
          <HoverCardContent 
            className="w-72 p-3" 
            style={{
              position: 'fixed',
              left: `${window.innerWidth > 768 ? window.innerWidth - 280 : 20}px`,
              top: '20px',
              zIndex: 50
            }}
          >
            {renderTooltipContent()}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};

export default DirectorGraph;
